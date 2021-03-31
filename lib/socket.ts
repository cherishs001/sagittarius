import {WSContext} from './index';
import {Struct} from 'superstruct';

class Socket {
    method: string | null;
    params_schema: Struct;

    async START(ctx: WSContext): Promise<void> {};
}

export default Socket;
