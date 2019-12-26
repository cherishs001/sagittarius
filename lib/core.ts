import * as http from 'http';
import {Server} from 'http';

/**
 * 提供对http的封装
 */
class Core {
    _server: Server;

    constructor() {
        this._server = http.createServer();
    }

    listen(port: number, callback?: () => void) {
        this._server.listen(port, () => {
            callback();
        });
    }
}

export default Core;
