import https from 'https';

const zipcode = '8100042';
const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;
new Promise((resolve, reject) => {
    return https.get(url, resolve).on('error', reject);
}).then(res => {
    return new Promise((resolve, reject) => {
        if (res.statusCode !== 200) {
            reject(res);
            return;
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
    });
}).then(data => {
    return new Promise((resolve, reject) => {
        try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
        } catch (e) {
            reject(e);
        }
    });
}).then(parsedData => {
    console.log(parsedData);
    console.log(JSON.stringify(parsedData.results[0]));
}).catch(console.error);
