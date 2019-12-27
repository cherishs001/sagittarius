import Context from './context';

const error = async (ctx: Context, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e);
        ctx.response.writeHead(500);
        ctx.response.end('error server 500 http/1.1');
    }
};

export default error;
