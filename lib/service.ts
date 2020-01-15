import {Context} from './index';
import {Struct} from 'superstruct';

class Service {
    path: string | null;
    post_schema: Struct;
    get_schema: Struct;
    put_schema: Struct;
    delete_schema: Struct;

    async GET(ctx: Context): Promise<void> {};
    async POST(ctx: Context): Promise<void> {};
    async PUT(ctx: Context): Promise<void> {};
    async DELETE(ctx: Context): Promise<void> {};
}

export default Service;
