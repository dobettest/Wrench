const { validate } = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        // uin: 'xxx', // 用户唯一 ID（可选）
        reportApiSpeed: {
            type: 'boolean',
        }, // 接口测速
        reportAssetSpeed: {
            type: 'boolean',
        }, // 静态资源测速
        spa: {
            type: 'boolean',
        } // spa 应用页面跳转的时候开启 pv 计算
    },
};
module.exports = function (source) {
    try {
        const options = this.getOptions();
        validate(schema, options);
        const { id, uin = '', reportApiSpeed, reportAssetSpeed, spa } = options;
        return `
        import Aegis from 'aegis-web-sdk';
        ${source}
        const aegis = new Aegis({
        id: '${id}', // 应用ID，即上报ID
        // uin: '${uin}', // 用户唯一 ID（可选）
        reportApiSpeed: ${reportApiSpeed}, // 接口测速
        reportAssetSpeed: ${reportAssetSpeed}, // 静态资源测速
        spa: ${spa} // spa 应用页面跳转的时候开启 pv 计算
        })
        // window.AegisClient = aegis;//其他页面直接使用AegisClient就可以进行监控
        `;
    } catch (error) {
        return source;//失败的话啥也不做
    }
}