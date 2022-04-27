"use strict";
exports.__esModule = true;
exports.expandFn = exports.toBase64 = exports.zero = exports.getType = exports.isPrimitiveValue = exports.wrapperNumber = exports.refercenceTypes = exports.primitiveTypes = void 0;
exports.primitiveTypes = ["string", "number", "null", "undefined", "binint", "boolean"];
exports.refercenceTypes = ["RegExp", "Date", "Object", "Function", "Array"];
/**
 * @description 将数字格式化成指定格式,例如1,234,567
 * @param num
 * @param len
 * @returns string
 */
function wrapperNumber(num, len) {
    if (len === void 0) { len = 3; }
    len = Math.max(len, 1); //解决numbers out of order in {} quantifier问题
    var source = "\\d{1,".concat(len, "}(?=(\\d{").concat(len, "})+$)");
    var reg = new RegExp(source, 'g');
    return "".concat(num).replace(reg, '$&,');
}
exports.wrapperNumber = wrapperNumber;
/**
 * @description 判断是否是基础数据类型
 * @param params primitiveTypes
 * @returns boolean
 */
function isPrimitiveValue(params) {
    return exports.primitiveTypes.some(function (type) { return typeof params === type; });
}
exports.isPrimitiveValue = isPrimitiveValue;
/**
 * @description 获取数据类型
 * @param param any
 * @returns string
 */
function getType(param) {
    if (isPrimitiveValue(param)) {
        return typeof param;
    }
    else {
        var str_1 = Object.prototype.toString.call(param);
        return exports.refercenceTypes.find(function (type) { return str_1 === "[object ".concat(type, "]"); }) || str_1;
    }
}
exports.getType = getType;
/**
 * @description 在小于10的数字前填充0,例如8 -> 08
 * @param num 需要转化的数字
 * @returns string
 */
function zero(num) {
    return num < 10 ? "0".concat(num) : num.toString();
}
exports.zero = zero;
/**
 * @description 将一个文件转化成base64格式
 * @param file File 需要转化成Base64的文件
 * @returns Promise
 */
function toBase64(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () { return resolve(reader.result); };
        reader.onerror = function (error) { return reject(error); };
    });
}
exports.toBase64 = toBase64;
/**
 *
 * @param initialValue 原始值
 * @param effect 副作用函数
 * @returns 修改后的值
 */
function expandFn(initialValue, effect) {
    var fn = function (initialValue) { return initialValue; };
    if (typeof effect === "function") {
        fn = effect;
    }
    var returnValue = fn(initialValue);
    if (typeof returnValue === undefined) {
        throw new Error("the return value can not be undefined");
    }
    return returnValue;
}
exports.expandFn = expandFn;
