import Context from './context';

const error = async (ctx: Context, next) => {
    const start = new Date().getTime();
    try {
        await next();
    } catch (e) {
        ctx.logs.error(e.toString());
        ctx.response.writeHead(500);
        ctx.response.end('error server 500 http/1.1');
    }
    const end = new Date().getTime();
    let ipAddress;
    const headers = ctx.request.headers;
    const forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = ctx.request.connection.remoteAddress;
    }
    ctx.logs.trace(`${ipAddress} ${ctx.method} ${ctx.path} ${JSON.stringify(ctx.params)} ${end - start}ms`);
};

export default error;
