import * as http from 'http';
import {Server} from 'http';
import Context from './context';
import error from './error';
import response from './response';
import params from './params';

/**
 * 提供对http的封装
 */
class Core {
    private _server: Server;
    private readonly _middleware_list: Array<(ctx: Context, next: (i?: number) => {}) => {}>;
    private _port: number = 3000;

    constructor() {
        this._middleware_list = [
            error,
            params,
            response,
        ];
    }

    use(middleware: (ctx: Context, next: (i?: number) => {}) => {}) {
        this._middleware_list.push(middleware);
    }

    listen(port?: number, listeningListener?: () => void) {
        const fn = this.composeMiddleware();
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

    composeMiddleware() {
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
