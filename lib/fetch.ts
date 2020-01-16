import node_fetch from 'node-fetch';

interface FetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    json?: boolean,
    body?: object,
    headers?: object,
}

const params = (data) => {
    const arr = [];
    for (const i in data) {
        if (data.hasOwnProperty(i)) {
            if (data[i] instanceof Array) {
                data[i] = JSON.stringify(data[i]);
            }
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
    }
    return arr.join('&');
};

const Fetch = (url: string, options: FetchOptions): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const opts: any = {
            method: options.method,
            headers: options.headers,
        };
        if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
            opts['body'] = JSON.stringify(options.body);
        }
        if (options.method === 'GET') {
            const data = params(options.body);
            url += url.indexOf('?') === -1 ? '?' + data : '&' + data;
        }

        if (options.json) {
            node_fetch(url, opts).then(res => res.json()).then(json => resolve(json)).catch(err => reject(err));
        } else {
            node_fetch(url, opts).then(res => res.text()).then(text => resolve(text)).catch(err => reject(err));
        }
    })
};

export {Fetch};
