import {IncomingMessage, ServerResponse} from 'http';

class Context {
    request: IncomingMessage;
    response: ServerResponse;
    body: any;
    status: number;
    headers: object;
    method: string;
    params: any;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.request = req;
        this.response = res;
        this.body = 'NOT FOUND';
        this.status = 200;
        this.headers = req.headers;
        this.method = req.method;
    }
}

export default Context;
