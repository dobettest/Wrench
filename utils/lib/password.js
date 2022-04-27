"use strict";
exports.__esModule = true;
exports.checkPass = exports.genUpperWord = exports.genLowerWord = exports.genChinese = exports.genSymbol = exports.genWord = exports._hasSymbol = exports._hasUpperWord = exports._hasLowerWord = exports._hasChinese = exports._hasNumber = void 0;
exports._hasNumber = /\d/g;
exports._hasChinese = /[\u4e00-\u9fa5]/g;
exports._hasLowerWord = /[a-z]/g;
exports._hasUpperWord = /[A-Z]/g;
exports._hasSymbol = /[!@#$%^*()&]/g;
var map = {
    "n": exports._hasNumber,
    "c": exports._hasChinese,
    "l": exports._hasLowerWord,
    "u": exports._hasUpperWord,
    "s": exports._hasSymbol
};
/**
 *
 * @param len 需要生成的长度
 * @param mode 1小写,2大写
 * @returns 生成的字母串
 */
function genWord(len, mode) {
    if (len === void 0) { len = 6; }
    if (mode === void 0) { mode = 0; }
    var lowerWords = "abcdefghijklmnopqrstuvwxyz"; //0
    var upperWords = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //1
    mode %= 2;
    var strArr = [];
    var randNum = 0;
    var randSeds = [lowerWords, upperWords].at(mode);
    var length = randSeds.length;
    for (var i = 0; i < len; i++) {
        randNum = Math.floor(Math.random() * length);
        strArr.push(randSeds.charAt(randNum));
    }
    strArr = strArr.sort(function () { return 1 - Math.random() * 2; });
    return strArr.join("");
}
exports.genWord = genWord;
/**
 *
 * @param len 生成的长度
 * @param expand 默认为!@#$%^*()&,需要添加的扩展字符
 * @returns 生成的符号串
 */
function genSymbol(len, expand) {
    if (len === void 0) { len = 6; }
    if (expand === void 0) { expand = ""; }
    var symbols = "!@#$%^*()&";
    var allSymbols = [symbols, expand].join("");
    var strArr = [];
    var length = allSymbols.length;
    var randNum = 0;
    for (var i = 0; i < len; i++) {
        randNum = Math.floor(Math.random() * length);
        strArr.push(allSymbols.charAt(randNum));
    }
    strArr = strArr.sort(function () { return 1 - Math.random() * 2; });
    return strArr.join("");
}
exports.genSymbol = genSymbol;
/**
 *
 * @param len 生成的长度
 * @param expand 默认为我是一个默认数据,需要扩展的字符串
 * @returns 生成的中文串
 */
function genChinese(len, expand) {
    if (len === void 0) { len = 6; }
    if (expand === void 0) { expand = ""; }
    var words = "我是一个默认数据";
    var allWords = [words, expand].join("");
    var strArr = [];
    var randNum = 0;
    var length = allWords.length;
    for (var i = 0; i < len; i++) {
        randNum = Math.floor(Math.random() * length);
        strArr.push(allWords.charAt(randNum));
    }
    strArr = strArr.sort(function () { return 1 - Math.random() * 2; });
    return strArr.join("");
}
exports.genChinese = genChinese;
/**
 *
 * @param len 生成的长度
 * @returns 小写字母串
 */
function genLowerWord(len) {
    if (len === void 0) { len = 6; }
    return genWord(len, 1);
}
exports.genLowerWord = genLowerWord;
/**
 *
 * @param len 生成的长度
 * @returns 大写字母串
 */
function genUpperWord(len) {
    if (len === void 0) { len = 6; }
    return genWord(len, 2);
}
exports.genUpperWord = genUpperWord;
/**
 *
 * @param mode 校验模式
 * @param password 密码串
 * @param minLen 最小长度
 * @param maxLen 最大长度
 * @returns 校验结果
 */
function checkPass(mode, password, minLen, maxLen) {
    if (minLen === void 0) { minLen = 8; }
    if (maxLen === void 0) { maxLen = 12; }
    return mode.split("").every(function (item) { return map[item].test(password); }) && (password.length > minLen && password.length < maxLen);
}
exports.checkPass = checkPass;
