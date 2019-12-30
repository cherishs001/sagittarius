import {Context} from './index';

class Service {
    path: string | null;

    async GET(ctx: Context): Promise<void> {};
    async POST(ctx: Context): Promise<void> {};
    async PUT(ctx: Context): Promise<void> {};
    async DELETE(ctx: Context): Promise<void> {};
}

export default Service;
