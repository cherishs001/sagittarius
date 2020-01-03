import {Config} from '../../lib';

export default class Product extends Config {
    async init(): Promise<void> {
        this.env = 'product';
        this.port = 3000;
        this.logs = {
            type: 'file',
            level: 'TRACE',
        };
    }
}
