import {Sagittarius} from '../lib';

const app = Sagittarius.app;

(async () => {
    await app.listen((env) => {
        console.log(`listen ${env.port} port`);
    });
})();
