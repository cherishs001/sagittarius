import {IncomingMessage, ServerResponse} from 'http';
import Config from './config';
import * as url from 'fast-url-parser';
import {Logger} from './logger';
import * as Snow from '@axihe/snowflake';
import {Connection} from '@kaishen/orm';
import LRUCache = require('lru-cache');

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
    config: Config | null;
    database: {[propsName: string]: Connection} | null;
    cache: LRUCache<unknown, unknown>;
    logs: Logger;
    info: string | null;
    'content-type': string | null;
    error: {
        [propName: number]: string;
    };
    snow_id: Snow;
    static_path: string;

    private _code: number;

    set code(val: number) {
        this._code = val;
        if (val !== 0) {
            if (val === 4001) {
                throw {
                    status: val,
                    message: '请求参数校验失败',
                }
            } else {
                throw {
                    status: val,
                    message: this.error[val],
                }
            }
        }
    }

    get code(): number {
        return this._code;
    }

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
        this.code = 0;
    }
}

export default Context;
