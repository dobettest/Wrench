const { expandConfig } = require("../utils")
module.exports = () => {
    const { id, uin, reportApiSpeed, reportAssetSpeed, spa } = expandConfig('aegisOptions', {});
    const template = `
    import Aegis from 'aegis-web-sdk';

    const aegis = new Aegis({
    id: ${id}, // 应用ID，即上报ID
    uin: ${uin}, // 用户唯一 ID（可选）
    reportApiSpeed: ${reportApiSpeed}, // 接口测速
    reportAssetSpeed: ${reportAssetSpeed}, // 静态资源测速
    spa: ${spa} // spa 应用页面跳转的时候开启 pv 计算
    })
    window.AegisClient = aegis;//其他页面直接使用AegisClient就可以进行监控
    `
    return template;
}