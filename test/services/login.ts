import {Context, Orm, Service, Schema} from '../../lib';

const struct = Schema.superstruct({
    types: {
        any: (value: any) => {
            return true;
        }
    },
});

export default class Login extends Service {
    path: string = '/api/v1/login';
    post_schema: Schema.Struct = struct({
        file: 'any',
    });

    async GET(ctx: Context): Promise<void> {
        ctx.logs.debug(`debug info`);

        ctx.info = '123';
        ctx.body = {
            id: 123,
        };
    };

    async POST(ctx: Context): Promise<void> {
        const {file} = ctx.params;
        console.log(file);
        ctx.body = {
            id: 123,
        };
    }
}
