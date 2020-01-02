import {IncomingMessage, ServerResponse} from 'http';
import * as url from 'url';
import Config from './config';
import * as url from 'fast-url-parser';

class Context {
    request: IncomingMessage;
    response: ServerResponse;
    body: any;
    status: number;
    headers: object;
    method: string;
    params: any;
    path: string;
    url: string;
    query: string | null;
    env: Config | null;

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.request = req;
        this.response = res;
        this.body = 'NOT FOUND';
        this.status = 200;
        this.headers = req.headers;
        this.method = req.method;
        const Url = url.parse(req.url);
        this.path = Url.pathname;
        this.url = Url.path;
        this.query = Url.query;
    }
}

export default Context;
