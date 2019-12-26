import Application from '../lib';

const app = new Application();
app.use(async (ctx, next) => {
    console.log(1111);
    await next();
    ctx.response.writeHead(200);
    ctx.response.end("A request come in");
});
app.listen(3000, (): void => {
    console.log(123);
});
