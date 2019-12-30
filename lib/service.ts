import {Context} from './index';

class Service {
    path: string | null;

    async GET(ctx: Context) {};
    async POST(ctx: Context) {};
    async PUT(ctx: Context) {};
    async DELETE(ctx: Context) {};
}

export default Service;
