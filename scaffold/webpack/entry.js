const { expandConfig, getRelativePath } = require("../utils");
const aegisUtil = require('./aegis')
module.exports = ({ aegis = false, miscro = false, vue = true, react = false }) => {
    const map = {
        aegis
    }
    const optionalEntry = [
        {
            name: 'aegis',
            value: aegisUtil()
        }].map((item) => { return map[item.name] === true ? item.value : undefined }).filter(Boolean);
    const entrys = {
        polyfill: ['core-js'],
        ...optionalEntry(),
        'app': getRelativePath('src/app.js')
    }
    return expandConfig('entry', entrys)
}