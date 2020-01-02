import {Context, Service} from '../../lib';

export default class Login extends Service {
    path = '/api/v1/login';

    async GET(ctx: Context): Promise<void> {
        const {id} = ctx.params;
        ctx.body = {
            id: id,
        };
    };

    async POST(ctx: Context): Promise<void> {
        const {id} = ctx.params;
        ctx.body = {
            id: id,
        };
    }
}
