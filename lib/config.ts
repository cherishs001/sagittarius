import {LogLevel, Type} from './logger';

interface Database {
    type: 'mysql'|'redis',
    host: string,
    port: number,
    username?: string,
    password?: string,
    database?: string,
}

interface Logs {
    type: Type;
    level: LogLevel;
}

abstract class Config {
    port: number = 3000;
    host: string = '0.0.0.0';
    logs: Logs;
    database: {
        [propName: string]: Database;
    };
    env: string = 'dev';
    error: {
        [propName: number]: string;
    };
    static_path: string;

    async init(): Promise<void> {};
}

export default Config;
