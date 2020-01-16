import {Config, Fetch} from '../../lib/index';

export default class Dev extends Config {
    async init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.env = 'dev';
            this.port = 3000;
            this.logs = {
                type: 'console',
                level: 'TRACE',
            };
            const res: any = await Fetch(
                'https://api.kaishens.cn/config/v1/server_config',
                {
                    method: 'GET',
                    json: true,
                },
            );
            const error = {};
            for (const item of res['data']['status_list']) {
                error[item['status']] = item['message'];
            }
            this.error = error;
            resolve();
        })
    }
}
