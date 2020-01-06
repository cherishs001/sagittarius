import {Config} from '../../lib';
import {Test} from '../model/DataCenter';

export default class Dev extends Config {
    async init(): Promise<void> {
        this.env = 'dev';
        this.port = 3000;
        this.logs = {
            type: 'console',
            level: 'TRACE',
        };
        this.error = {
            5100: '数据错误',
        };
        this.database = {
            data_center: {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'data_center',
                entities: [Test],
            },
        };
    }
}
