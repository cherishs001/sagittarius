import Load from './load';
import * as path from 'path';
import Context from './context';

class Router {
    private readonly _services: object;

    constructor() {
        this._services = {};
    }

    init() {
        // 动态导入路由
        const services = Load.init(path.join(process.cwd(), './services'));
        for (const item of services) {
            this._services[`/${item['name']}`] = item['func']
        }
    }

    async router(ctx: Context, next) {
        if (this._services.hasOwnProperty(ctx.path)) {
            if (ctx.method === 'GET') {
                await this._services[ctx.path]['GET'](ctx);
            }
            if (ctx.method === 'POST') {
                await this._services[ctx.path]['POST'](ctx);
            }
            if (ctx.method === 'PUT') {
                await this._services[ctx.path]['PUT'](ctx);
            }
            if (ctx.method === 'DELETE') {
                await this._services[ctx.path]['DELETE'](ctx);
            }
        }
        await next();
    }
}

export default Router;
