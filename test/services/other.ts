import {Service} from '../../lib';

export default class Other extends Service {
    async GET(ctx): Promise<any> {
        ctx.body = {
            a: 1,
        };
    }
}
