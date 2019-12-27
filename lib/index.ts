import Core from './core';
import Context from './context';

class Sagittarius extends Core {
    static app: Sagittarius = new Sagittarius();

    private constructor() {
        super();
    }
}

export {
    Sagittarius,
    Context,
};
