import {IncomingMessage, ServerResponse} from 'http';
import Config from './config';
import * as url from 'fast-url-parser';
import Logger from './logger';
import * as path from 'path';

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
    logs: Logger;

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
        this.logs = new Logger('file', path.join(process.cwd(), './logs/'));
    }
}

export default Context;
