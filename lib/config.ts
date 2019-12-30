interface Database {
    type: string,
    host: string,
    port: number,
    user?: string,
    password?: string,
    database?: string,
}

abstract class Config {
    port: number = 3000;
    host: string = '0.0.0.0';
    database: Database;
    env: string = 'dev';

    async init(): Promise<void> {};
}
