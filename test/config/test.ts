import {Config} from '../../lib';

export default class Test extends Config {
    async init(): Promise<void> {
        this.env = 'test';
        this.port = 3000;
    }
}
