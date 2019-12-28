import {Context} from '../../lib';

export default {
    async GET(ctx: Context) {
        const {id} = ctx.params;
        ctx.body = {
            id: id,
        };
    },
}
