import * as fs from 'fs';
import * as path from 'path';

/**
 * 动态加载类
 */
class Load {
    static init(dir: string): Array<any> {
        const dynamicModules = [];
        fs.readdirSync(dir).map(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                if (file.match(/\.ts|.js$/) !== null) {
                    let name = filePath.replace('.ts', '');
                    name = name.replace('.js', '');
                    let key = file.replace('.ts', '');
                    key = key.replace('.js', '');
                    const module = require(name).default;
                    dynamicModules.push({
                        name: key,
                        func: module,
                    });
                }
            }
        });
        return dynamicModules;
    }
}

export default Load;
