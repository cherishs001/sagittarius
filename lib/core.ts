import * as http from 'http';
import {Server} from 'http';
import Context from './context';
import error from './error';
import response from './response';
import params from './params';
import Router from './router';

/**
 * 提供对http的封装
 */
class Core {
    private _server: Server;
    private _port: number = 3000;
    private readonly _middleware_list: Array<(ctx: Context, next: (i?: number) => {}) => {}>;

    constructor() {
        this._middleware_list = [];
    }

    use(middleware: (ctx: Context, next: (i?: number) => {}) => {}): void {
        this._middleware_list.push(middleware);
    }

    listen(port?: number, listeningListener?: () => void): void {
        const fn = this.composeMiddleware();

        const router = new Router();
        router.init();

        this._middleware_list.unshift(router.router.bind(router));
        this._middleware_list.unshift(response);
        this._middleware_list.unshift(params);
        this._middleware_list.unshift(error);

        this._server = http.createServer(async (req, res) => {
            const context = new Context(req, res);
            await fn(context);
        });
        if (port) {
            this._port = port;
        }
        this._server.listen(this._port, () => {
            if (listeningListener) {
                listeningListener();
            }
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
