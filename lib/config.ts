interface Database {
    type: 'mysql'|'redis',
    host: string,
    port: number,
    user?: string,
    password?: string,
    database?: string,
}

abstract class Config {
    port: number = 3000;
    host: string = '0.0.0.0';
    database: {
        [propName: string]: Database;
    };
    env: string = 'dev';

    async init(): Promise<void> {};
}

export default Config;
