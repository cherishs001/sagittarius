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

const pipeBusBoy = (busboy, req) => {
    const formData: any = {};

    return new Promise(async (resolve, reject) => {
        const snowRes = {
            data: {snowId: 123},
        };

        //  解析请求文件事件
        busboy.on('file', (filenames, file, filename, encoding, mimetype) => {
            const name = `${snowRes['data']['snowId']}.${getSuffixName(filename)}`;
            // let len = 0;
            const p = path.join(__dirname, `../static/${name}`);
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

const params = async (ctx: Context, next) => {
    if (ctx.method === 'POST') {
        if (ctx.headers['content-type'].indexOf('multipart/form-data') >= 0) {
            const busboy = new Busboy({headers: ctx.headers});
            ctx.params = await pipeBusBoy(busboy, ctx.request);
        } else {
            ctx.params = await parsePostData(ctx);
        }
    }
    if (ctx.method === 'GET') {
        const url = ctx.request.url;
        const urlSplit = url.split('?');
        if (urlSplit.length > 0) {
            ctx.params = parseQueryStr(urlSplit[1], false);
        } else {
            ctx.params = {};
        }
    }
    await next();
};

export default params;
