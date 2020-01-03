import {Context, Service} from '../../lib';
import {Test} from '../model/DataCenter';

export default class Login extends Service {
    path = '/api/v1/login';

    async GET(ctx: Context): Promise<void> {
        const {id} = ctx.params;
        ctx.logs.debug(`debug info`);
        await ctx.database['data_center'].createQueryBuilder().insert().into(Test).values({
            name: '123',
            age: 1,
        }).execute();
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
