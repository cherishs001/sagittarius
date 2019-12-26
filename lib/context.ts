import {IncomingMessage, ServerResponse} from 'http';

class Context {
    request: IncomingMessage;
    response: ServerResponse;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.request = req;
        this.response = res;
    }
}

export default Context;
