import Core from './core';
import Context from './context';
import Service from './service';
import Config from './config';
import {Logger} from './logger';
import * as Orm from 'typeorm';
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
    Schema,
};
