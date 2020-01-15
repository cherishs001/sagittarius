import * as fs from 'fs';
import * as moment from 'moment';


type LogLevel = 'TRACE'|        // 链路
    'DEBUG'|                    // 调试
    'INFO'|                     // 普通
    'WARN'|                     // 警告
    'ERROR'|                    // 错误
    'FATAL'|                    // 失败
    'ALL'|                      // 全量
    'OFF'|                      // 关闭
    'MARK';                     // 标记

type Type = 'console'|'file';

class Logger {
    level: LogLevel;
    type: Type;
    path?: string;

    constructor(type: Type = 'console', path?: string) {
        this.level = 'TRACE';
        this.type = type;
        this.path = path || '';
    }

    trace(msg: string): void {
        this._log('TRACE', msg);
    }

    info(msg: string): void {
        if (this.level === 'ALL' || this.level === 'INFO') {
            this._log('INFO', msg);
        }
    }

    debug(msg: string): void {
        if (this.level === 'ALL' || this.level === 'DEBUG') {
            this._log('DEBUG', msg);
        }
    }

    warn(msg: string): void {
        if (this.level === 'ALL' || this.level === 'WARN') {
            this._log('WARN', msg);
        }
    }

    error(msg: string): void {
        this._log('ERROR', msg);
    }

    fatal(msg: string): void {
        this._log('FATAL', msg);
    }

    off(msg: string): void {
        this._log('OFF', msg);
    }

    mark(msg: string): void {
        if (this.level === 'ALL' || this.level === 'MARK') {
            this._log('MARK', msg);
        }
    }

    private _log(name: string, msg: string): void {
        // 按照配置写入文件或控制台
        const time = moment();
        const msg2 = `[${time.format('YYYY-MM-DD hh:mm:ss.SSS')}] [${name}] ${msg}`;
        if (this.type === 'console') {
            console.log(msg2);
        }
        if (this.type === 'file') {
            fs.appendFileSync(`${this.path}${name}-${time.format('YYYY年MM月DD日')}${time.hour()}时.log`, msg2 + '\r\n');
        }
    }
}

export {
    Logger,
    LogLevel,
    Type,
};
