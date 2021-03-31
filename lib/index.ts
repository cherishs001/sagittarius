import Core from './core';
import Context from './context';
import WSContext from './ws_context';
import Service from './service';
import Socket from './socket';
import Config from './config';
import {Logger} from './logger';
import Fetch from './fetch';
import {Orm, Database, getConnection} from '@kaishen/orm';
import * as Schema from 'superstruct';

class Sagittarius extends Core {
    static app: Sagittarius = new Sagittarius();

    private constructor() {
        super();
    }
}

export {
    Sagittarius,
    Context,
    Service,
    Config,
    Logger,
    Orm,
    Database,
    getConnection,
    Schema,
    Fetch,
    WSContext,
    Socket,
};
