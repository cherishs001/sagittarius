import {Config} from '../../lib';

export default class Test extends Config {
    async init(): Promise<void> {
        this.env = 'test';
        this.port = 3000;
        this.database = {
            a: {
                type: 'mysql',
                host: '127.0.0.1',
                port: 3000,
            },
        };
    }
}
