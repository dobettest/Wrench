const path = require("path");
const fs = require("fs");
let _cachedConfig;
// 项目的根目录
const projectPath = process.cwd();
/**
 * @description 获取文件相对于项目的相对路径
 * @param {string} dir
 * @returns {string}
 */
function getRelativePath(dir) {
    return path.join(projectPath, dir)
}
/**
 * @description 判断一个文件是否存在
 * @param {string} filepath
 * @returns {boolean}
 */
function isFileExist(filepath) {
    return fs.existsSync(filepath) && fs.statSync(filepath).isFile()
}

/**
 * @description 获取项目配置
 * @returns {object}
 */
function wrenchConfig() {
    if (_cachedConfig) {
        return _cachedConfig;//缓存节省性能
    }
    const configPath = getRelativePath("wrench.config.js");
    const _hasConfig = isFileExist(configPath);
    return _cachedConfig = _hasConfig ? require(configPath) : {};
}
/**
 * @description 设置环境变量
 * @param {string} envKey 
 * @param {any} configValue 
 * @param {any} defaultValue 
 */
function setConfig(envKey, configValue, defaultValue) {
    let conf;
    if (process.env[envKey] !== undefined) {
        conf = process.env[envKey];
    } else {
        conf = configValue;
    }
    if (conf === undefined) {
        conf = defaultValue;
    }
    return conf;
}
/**
 * @description 加载dotenv文件
 * @param {string} mode 
 */
function loadEnv(mode) {
    const basePath = path.resolve(projectPath, `.env${mode ? `.${mode}` : ``}`);
    const localPath = `${basePath}.local`;
    const load = envPath => {
        try {
            const env = dotenv.config({ path: envPath })
            dotenvExpand(env)
        } catch (err) {
            // only ignore error if file is not found
            if (err.toString().indexOf('ENOENT') < 0) {
                console.error(err)
            }
        }
    }
    load(basePath);
    load(localPath);
}
/**
 * @description 扩展指定名称配置
 * @param {string} name
 * @param {Object} originalConfig
 * @param {Object} scope
 * @returns {Object}
 */
function expandConfig(name, originalConfig, scope) {
    let fn = (original) => original;
    const expandFn = scope ? scope[name] : wrenchConfig()[name];
    if (typeof expandFn === "function") {
        fn = expandFn
    }
    const config = fn(originalConfig);
    if (typeof config === "undefined") {
        throw new Error(`The returnValue of webpack.${name} must be an object！`);
    }
    return config;
}
module.exports = {
    wrenchConfig,
    isFileExist,
    expandConfig,
    loadEnv,
    setConfig,
    getRelativePath
}