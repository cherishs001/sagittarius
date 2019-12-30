import Core from './core';
import Context from './context';
import Service from './service';

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
};
