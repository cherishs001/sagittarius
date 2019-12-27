import Load from './load';
import * as path from 'path';
import Context from './context';

class Router {
    services: any;

    constructor() {
        this.services = [];
    }

    init() {
        // 动态导入路由
        this.services = Load.init(path.join(process.cwd(), './services'));
        console.log(this.services);
    }

    async router(ctx: Context, next) {
        for (const item of this.services) {
            if (`/${item.name}` === ctx.request.url) {
                await item['func'](ctx);
            }
        }
        await next();
    }
}

export default Router;
