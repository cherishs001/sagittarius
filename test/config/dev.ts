import {Config} from '../../lib/index';
import * as request from 'request';

export default class Dev extends Config {
    async init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.env = 'dev';
            this.port = 3000;
            this.logs = {
                type: 'console',
                level: 'TRACE',
            };
            const res: any = await this.reqs(`https://api.kaishens.cn/config/v1/server_config`);
            res.status;
            const error = {};
            for (const item of res['data']['status_list']) {
                error[item['status']] = item['message'];
            }
            this.error = error;
            resolve();
        })
    }

    async reqs(uri: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request.get(
                uri,
                (err, r) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(r.body));
                    }
                },
            );
        })
    }
}
