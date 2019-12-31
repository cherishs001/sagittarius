import {Sagittarius} from '../lib';

const app = Sagittarius.app;

(async () => {
    await app.listen(3000, () => {
        console.log('listen 3000 port');
    });
})();
