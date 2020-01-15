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
                try {
                    if (this._services[ctx.path].get_schema) {
                        this._services[ctx.path].get_schema(ctx.params);
                    }
                } catch (e) {
                    ctx.code = 4001;
                }
                await this._services[ctx.path].GET(ctx);
            }
            if (ctx.method === 'POST' && this._services[ctx.path].POST) {
                try {
                    if (this._services[ctx.path].post_schema) {
                        this._services[ctx.path].post_schema(ctx.params);
                    }
                } catch (e) {
                    ctx.code = 4001;
                }
                await this._services[ctx.path].POST(ctx);
            }
            if (ctx.method === 'PUT' && this._services[ctx.path].PUT) {
                try {
                    if (this._services[ctx.path].put_schema) {
                        this._services[ctx.path].put_schema(ctx.params);
                    }
                } catch (e) {
                    ctx.code = 4001;
                }
                await this._services[ctx.path].PUT(ctx);
            }
            if (ctx.method === 'DELETE' && this._services[ctx.path].DELETE) {
                try {
                    if (this._services[ctx.path].delete_schema) {
                        this._services[ctx.path].delete_schema(ctx.params);
                    }
                } catch (e) {
                    ctx.code = 4001;
                }
                await this._services[ctx.path].DELETE(ctx);
            }
        }
        await next();
    }
}

export default Router;
