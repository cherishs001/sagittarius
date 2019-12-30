import Load from './load';
import * as path from 'path';
import Context from './context';
import Service from './service';

class Router {
    private readonly _services: object;

    constructor() {
        this._services = {};
    }

    init(): void {
        // 动态导入路由
        const services = Load.init(path.join(process.cwd(), './services'));
        for (const item of services) {
            const service = new item['func'];
            const path = [new item['func']][0]['path'];
            if (path) {
                this._services[path] = service;
            } else {
                this._services[`/${item['name']}`] = service;
            }
        }
    }

    async router(ctx: Context, next: (i?: number) => {}): Promise<void> {
        if (this._services.hasOwnProperty(ctx.path)) {
            if (ctx.method === 'GET' && this._services[ctx.path].GET) {
                await this._services[ctx.path].GET(ctx);
            }
            if (ctx.method === 'POST' && this._services[ctx.path].POST) {
                await this._services[ctx.path].POST(ctx);
            }
            if (ctx.method === 'PUT' && this._services[ctx.path].PUT) {
                await this._services[ctx.path].PUT(ctx);
            }
            if (ctx.method === 'DELETE' && this._services[ctx.path].DELETE) {
                await this._services[ctx.path].DELETE(ctx);
            }
        }
        await next();
    }
}

export default Router;
