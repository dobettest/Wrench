module.exports = {
    envs: (config) => {
        return { ...config, react: true, vue: true, typescript: true, scss: true, less: true, aegis: true, analyze: true };
    },
    entry: (config) => {
        config.app = "./src/main.tsx"
        return config;
    },
    devServer: (config) => {
        config.headers = { 'Access-Control-Allow-Origin': '*' };
        config.port = 9005;
        return config;
    },
    babel: (config) => {
        config.plugins.push([
            'import',
            {
                "libraryName": "antd",
                "style": true,   // or 'css'
            }
        ])
        return config;
    },
    aegisOptions: () => {
        return {
            entry: "./src/main.tsx",
            id: 'ZEn7bsvP6v1GRLXrEo', // 上报 id
            // uin: 'xxx', // 用户唯一 ID（可选）
            reportApiSpeed: true, // 接口测速
            reportAssetSpeed: true, // 静态资源测速
            spa: true // spa 应用页面跳转的时候开启 pv 计算
        };
    },
    htmlPlugin: (config) => {
        config.template = "./public/index.html";
        config.templateParameters = {
            BASE_URL: "."
        }
        return config;
    }
}