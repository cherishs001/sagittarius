import Context from './context';

const response = async (ctx: Context, next) => {
    await next();
    if (ctx.request.headers['content-type']) {
        ctx.response.setHeader('content-type', ctx.request.headers['content-type']);
    }
    ctx.response.writeHead(ctx.status);
    if (typeof ctx.body === 'object') {
        ctx.body = JSON.stringify(ctx.body);
    }
    if (typeof ctx.body === 'number') {
        ctx.body = `${ctx.body}`;
    }
    ctx.response.end(ctx.body);
};

export default response;
