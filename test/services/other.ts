import {Context, Service} from '../../lib';

export default class Other extends Service {
    async GET(ctx: Context): Promise<void> {
        ctx.body = {
            a: 1,
        };
    }
}
