import * as Busboy from 'busboy';
import * as fs from 'fs';
import * as path from 'path';
import Context from './context';

const parseQueryStr = (queryStr, isJson) => {
    if (isJson) {
        return JSON.parse(queryStr);
    } else {
        const queryData = {};
        const queryStrList = queryStr.split('&');
        for (const [index, queryStr] of queryStrList.entries()) {
            const itemList = queryStr.split('=');
            queryData[itemList[0]] = decodeURIComponent(itemList[1]);
        }
        return queryData;
    }
};

const parsePostData = (ctx: Context) => {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            const isJson = ctx.headers['content-type'] === 'application/json';
            ctx.request.addListener('data', (data) => { // 有数据传入的时候
                postData += data;
            });
            ctx.request.on('end', () => {
                const parseData = parseQueryStr(postData, isJson);
                resolve(parseData);
            });
        } catch (e) {
            reject(e);
        }
    })
};

const getSuffixName = (fileName: string) => {
    const nameList = fileName.split('.');
    return nameList[nameList.length - 1];
};

const pipeBusBoy = (busboy, req, snow_id, static_path) => {
    const formData: any = {};

    return new Promise(async (resolve, reject) => {
        const snowRes = {
            data: {snowId: snow_id},
        };

        //  解析请求文件事件
        busboy.on('file', (filenames, file, filename, encoding, mimetype) => {
            const name = `${snowRes['data']['snowId']}.${getSuffixName(filename)}`;
            // let len = 0;
            const p = path.join(static_path, `${name}`);
            file.pipe(fs.createWriteStream(p));
            formData[filenames] = {
                title: filename,
                name,
                path: p,
            };
            file.on('data', (data) => {
            });
            file.on('end', () => {
            });
        });

        busboy.on('field', (filenames, val, fieldnameTruncated, valTruncated) => {
            formData[filenames] = val;
        });

        //  解析结束事件
        busboy.on('finish', () => {
            resolve(formData);
        });

        //  解析错误事件
        busboy.on('error', (err) => {
            reject({
                status: 5000,
                message: '表单处理出错',
            });
        });
        req.pipe(busboy);
    })
};

const getStat = (path): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if(err){
                resolve(false);
            }else{
                resolve(stats);
            }
        })
    })
}

const mkdir = (dir): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}

const dirExists = async (dir) => {
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if(isExists && isExists.isDirectory()){
        return true;
    }else if(isExists){     //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir;      //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if(status){
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}

const params = async (ctx: Context, next) => {
    if (ctx.method === 'POST') {
        if (ctx.headers['content-type'].indexOf('multipart/form-data') >= 0) {
            const snow_id = ctx.snow_id.nextId();
            const busboy = new Busboy({headers: ctx.headers});
            const static_path = ctx.static_path;
            // 这里先判断是否有static_path, 不存在要创建一下
            await dirExists(static_path);
            ctx.params = await pipeBusBoy(busboy, ctx.request, snow_id, static_path);
        } else {
            ctx.params = await parsePostData(ctx);
        }
    }
    if (ctx.method === 'GET') {
        if (ctx.query) {
            ctx.params = parseQueryStr(ctx.query, false);
        } else {
            ctx.params = {};
        }
    }
    await next();
};

export default params;
