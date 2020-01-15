import {Context, Orm, Service, Schema} from '../../lib';

export default class Login extends Service {
    path: string = '/api/v1/login';
    get_schema: Schema.Struct = Schema.struct({
        id: 'number',
    });

    async GET(ctx: Context): Promise<void> {
        const {id} = ctx.params;
        ctx.logs.debug(`debug info`);
        ctx.info = '123';
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
