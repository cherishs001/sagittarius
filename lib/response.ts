import Context from './context';

const response = async (ctx: Context, next) => {
    await next();
    if (ctx['content-type']) {
        ctx.response.setHeader('content-type', ctx['content-type']);
    } else {
        ctx.response.setHeader('content-type', 'application/json;utf-8');
    }
    ctx.response.writeHead(ctx.status);
    if (ctx.info) {
        ctx.body = {
            status: 1000,
            message: ctx.info,
            data: ctx.body,
        }
    }
    if (typeof ctx.body === 'object' && !Buffer.isBuffer(ctx.body)) {
        ctx.body = JSON.stringify(ctx.body);
    }
    if (typeof ctx.body === 'number') {
        ctx.body = `${ctx.body}`;
    }
    if (Buffer.isBuffer(ctx.body)) {
        ctx.body = ctx.body;
    }
    ctx.response.end(ctx.body);
};

export default response;
