const { exec } = require("child_process");
const { cwd } = require("process");
function clone(url, localPath = cwd()) {
    return new Promise((resolve, reject) => {
        const reg = /^https:\/\/([a-zA-Z]+)\.com\/([\s\S]+)/;
        const [raw, type] = url.match(reg);
        switch (type) {
            case 'github':
                url = ['https://github.com.cnpmjs.org', url.slice(18)].join('');
                break;
            case 'gitee':
                break;
            default:
                break;
        }
        try {
            exec(`git clone --depth=1 ${url} ${localPath}`, { signal: 0, }, (err) => {
                //加速下载失败则使用原始路径下载
                if (err) {
                    console.log('throw', err)
                    throw new Error('无法使用加速域名下载');
                }
                resolve();
            })
        } catch (error) {
            console.log('----------------------\n 开始使用原始域名下载');
            exec(`git clone --depth=1 ${raw} ${localPath}`, (err) => {
                if (err) {
                    reject(err)
                }
                resolve();
            })
        }
    })
}
module.exports = {
    clone
}