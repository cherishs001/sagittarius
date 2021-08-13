import {LogLevel, Type} from './logger';

interface Database {
    type: 'mysql'|'redis',
    host: string,
    port: number,
    username?: string,
    password?: string,
    database?: string,
    pool?: {max?: number, min?: number, idleTimeoutMillis?: number, evictionRunIntervalMillis?: number}
}

interface Logs {
    type: Type;
    level: LogLevel;
}

abstract class Config {
    port: number = 3000;
    ws_connect_msg?: string;
    host: string = '0.0.0.0';
    logs: Logs;
    database: {
        [propName: string]: Database;
    };
    env: string = 'dev';
    error: {
        [propName: number]: string;
    };
    custom?: {
        [propName: string]: any;
    };
    static_path: string;

    async init(): Promise<void> {};
}

export default Config;
