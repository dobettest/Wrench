const { expandConfig, getRelativePath } = require("@/utils");
module.exports = expandConfig("copyPlugin", {
    patterns: [
        {
            from: getRelativePath('public'),
            to: getRelativePath('dist'),
            toType: 'dir',
            globOptions: {
                dot: true,
                gitignore: true,
                ignore: [
                    '.DS_Store',
                    '**/*.html'
                ]
            }
        }
    ]
})