import * as http from 'http';
import { Server } from 'http';
import Context from './context';
import error from './error';
import response from './response';
import params from './params';
import Router from './router';
import Load from './load';
import * as path from 'path';
import { Logger, LogLevel } from './logger';
import { Orm, Connection } from '@kaishen/orm';
import * as Snow from '@axihe/snowflake';
import * as domain from 'domain';

/**
 * 提供对http的封装
 */
class Core {
    private _server: Server;
    private _port: number = 3000;
    private readonly _middleware_list: Array<(ctx: Context, next: (i?: number) => {}) => {}>;
    private _config: any;

    constructor() {
        this._middleware_list = [];
    }

    use(middleware: (ctx: Context, next: (i?: number) => {}) => {}): void {
        this._middleware_list.push(middleware);
    }

    listen(listeningListener?: (Environment: any) => void): Promise<any> {
        return new Promise<any>(async (resolve) => {
            const router = new Router();
            router.init();

            // 加载配置
            const config = Load.init(path.join(process.cwd(), './config'));
            const configs = {};
            for (const item of config) {
                if (item['name'] === process.env.NODE_ENV) {
                    const c = new item['func'];
                    await c.init();
                    configs[item['name']] = c;
                }
            }

            this._config = configs[process.env.NODE_ENV];

            this._middleware_list.unshift(router.router.bind(router));
            this._middleware_list.unshift(response);
            this._middleware_list.unshift(error);
            this._middleware_list.unshift(params);

            this._port = this._config['port'];

            // 注入日志
            const logs = new Logger(this._config['logs']['type'], path.join(process.cwd(), './logs/'));
            logs.level = this._config['logs']['level'];

            // 注入数据库
            const database: { [propsName: string]: Connection } = {};
            for (const key in this._config['database']) {
                if (this._config['database'].hasOwnProperty(key)) {
                    const tmp = new Orm(
                        this._config['database'][key].host,
                        this._config['database'][key].port,
                        this._config['database'][key].username,
                        this._config['database'][key].password,
                        this._config['database'][key].database,
                    );
                    database[key] = tmp.authenticate(key);
                }
            }
            const fn = this.composeMiddleware();

            this._server = http.createServer(async (req, res) => {
                const d = domain.create();
                const context = new Context(req, res);
                if (req.headers['x-logs-level']) {
                    logs.level = req.headers['x-logs-level'] as LogLevel;
                }
                context.logs = logs;
                context.error = this._config['error'];
                context.static_path = this._config['static_path'] || path.join(process.cwd(), './static');
                context.snow_id = new Snow(0, 0);
                context.config = this._config;
                context.database = database;
                await fn(context);
                d.on('error', (err) => {
                    context.response.writeHead(500);
                    context.response.end(JSON.stringify({
                        status: 500,
                        message: err.message || err.toString,
                    }));
                    d.exit();
                })
            }).listen(this._port, () => {
                if (listeningListener) {
                    listeningListener(this._config);
                    resolve(this._server);
                }
            });
        });
    }

    composeMiddleware(): (ctx: Context) => {} {
        const middleware_list = this._middleware_list;
        return (ctx: Context) => {
            let start = -1;
            const dispatch = (i?: number) => {
                if (i <= start) {
                    return Promise.reject(new Error('next() call more than once!'));
                }
                if (i >= middleware_list.length) {
                    return Promise.resolve();
                }
                start = i;
                const middleware = middleware_list[i];
                return middleware(ctx, () => {
                    return dispatch(i + 1);
                });
            };
            return dispatch(0);
        };
    }
}

export default Core;
