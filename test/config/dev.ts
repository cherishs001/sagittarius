import {Config} from '../../lib';

export default class Dev extends Config {
    async init(): Promise<void> {
        this.env = 'dev';
        this.port = 3000;
    }
}
