import * as http from 'http';
import {Server} from 'http';
import Context from './context';
import error from './error';
import response from './response';
import params from './params';
import Router from './router';
import Load from './load';
import * as path from "path";

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

    listen(listeningListener?: (Environment) => void): Promise<void> {
        return new Promise<void>(async (resolve) => {
            const fn = this.composeMiddleware();

            const router = new Router();
            router.init();

            // 加载配置
            const config = Load.init(path.join(process.cwd(), './config'));
            const configs = {};
            for (const item of config) {
                const c = new item['func'];
                await c.init();
                configs[item['name']] = c;
            }

            this._config = configs[process.env.NODE_ENV];

            this._middleware_list.unshift(router.router.bind(router));
            this._middleware_list.unshift(response);
            this._middleware_list.unshift(params);
            this._middleware_list.unshift(error);

            this._port = this._config['port'];

            this._server = http.createServer(async (req, res) => {
                const context = new Context(req, res);
                await fn(context);
            }).listen(this._port, () => {
                if (listeningListener) {
                    listeningListener(this._config);
                    resolve();
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
