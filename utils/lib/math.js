"use strict";
exports.__esModule = true;
exports.isPrimitive = exports.randomString = void 0;
/**
 * @description 返回一个1~32长度的随机数字字符串
 * @param len number 随机串长度
 * @returns string
 */
function randomString(len) {
    if (len === void 0) { len = 6; }
    len = len > 0 ? -len : len;
    return Math.random().toString().slice(len);
}
exports.randomString = randomString;
/**
 * @description 判断一个数字是否是素数
 * @param num 需要判断的数字
 * @returns boolean
 */
function isPrimitive(num) {
    for (var i = 2; i <= num; i++) {
        if (i === num) {
            return true;
        }
        if (num % i === 0) {
            return false;
        }
    }
    return false;
}
exports.isPrimitive = isPrimitive;
