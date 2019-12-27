import {Sagittarius} from '../lib';

const app = Sagittarius.app;

app.use(async (ctx, next) => {
    await next();
});

app.use(async (ctx, next) => {
    await next();
});

app.use(async (ctx, next) => {
    await next();
});

app.listen();
