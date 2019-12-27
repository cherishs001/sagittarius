import Sagittarius from '../lib';

const app = Sagittarius.app;

app.use(async (ctx, next) => {
    await next();
});

app.use(async (ctx, next) => {
    await next();
});

app.use(async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {123: 1};
    await next();
});

app.listen();
