import * as http from 'http';
import {IncomingMessage, Server, ServerResponse} from 'http';
import Context from './context';

/**
 * 提供对http的封装
 */
class Core {
    _server: Server;
    private readonly _middleware_list: Array<(ctx: Context, next: (i: number) => {}) => {}>;

    constructor() {
        this._middleware_list = [];
    }

    use(middleware) {
        this._middleware_list.push(middleware);
    }

    listen(port: number, listeningListener?: () => void) {
        const fn = this.composeMiddleware();
        this._server = http.createServer(async (req, res) => {
            const context = new Context(req, res);
            await fn(context);
        });
        this._server.listen(port, () => {
            listeningListener();
        });
    }

    composeMiddleware() {
        const middleware_list = this._middleware_list;
        return (ctx: Context) => {
            let start = -1;
            const dispatch = (i: number) => {
                if (i <= start) {
                    return Promise.reject(new Error("next() call more than once!"));
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
