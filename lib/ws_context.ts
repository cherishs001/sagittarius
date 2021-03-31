import Config from './config';
import {Logger} from './logger';
import * as Snow from '@axihe/snowflake';
import {Connection} from '@kaishen/orm';

class WSContext {
    body: any;
    status: number;
    headers: object;
    method: string;
    params: any;
    env: Config | null;
    config: Config | null;
    database: {[propsName: string]: Connection} | null;
    logs: Logger;
    info: string | null;
    error: {
        [propName: number]: string;
    };
    snow_id: Snow;

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

    constructor(params: any) {
        this.body = 'NOT FOUND';
        this.status = 200;
        this.headers = params.headers || {};
        this.params = params.data || {};
        this.method = params.method || '';
        this.code = 0;
    }
}

export default WSContext;
