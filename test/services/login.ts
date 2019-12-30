import {Service} from '../../lib';

export default class Login extends Service {
    constructor() {
        super();
        this.path = '/api/v1/login';
    }

    async GET(ctx) {
        const {id} = ctx.params;
        ctx.body = {
            id: id,
        };
    };

    async POST(ctx) {
        const {id} = ctx.params;
        ctx.body = {
            id: id,
        };
    }
}
