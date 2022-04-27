"use strict";
exports.__esModule = true;
exports.formatText = exports.isLeapYear = exports.weeks = exports.month = exports.week = exports.day = exports.hour = exports.minute = void 0;
var common_1 = require("./common");
exports.minute = 60 * 1000;
exports.hour = 60 * exports.minute;
exports.day = 24 * exports.hour;
exports.week = 7 * exports.day;
exports.month = 31 * exports.day;
var weeks;
(function (weeks) {
    weeks[weeks["\u661F\u671F\u4E00"] = 1] = "\u661F\u671F\u4E00";
    weeks[weeks["\u661F\u671F\u4E8C"] = 2] = "\u661F\u671F\u4E8C";
    weeks[weeks["\u661F\u671F\u4E09"] = 3] = "\u661F\u671F\u4E09";
    weeks[weeks["\u661F\u671F\u56DB"] = 4] = "\u661F\u671F\u56DB";
    weeks[weeks["\u661F\u671F\u4E94"] = 5] = "\u661F\u671F\u4E94";
    weeks[weeks["\u661F\u671F\u516D"] = 6] = "\u661F\u671F\u516D";
    weeks[weeks["\u661F\u671F\u5929"] = 0] = "\u661F\u671F\u5929";
})(weeks = exports.weeks || (exports.weeks = {}));
/**
 * @description 推断指定年份是否是闰年
 * @param year number
 * @returns boolean
 */
function isLeapYear(year) {
    year = year === undefined ? new Date().getFullYear() : year;
    var condition1 = year % 4 == 0 && year % 100 != 0;
    var condition2 = year % 400 == 0;
    return condition1 || condition2;
}
exports.isLeapYear = isLeapYear;
/**
 * @description 对指定日期进行格式化操作
 * @param dateTime string | number | Date
 * @returns string
 */
function formatText(dateTime) {
    var now = Date.now();
    var formateTime;
    var type = (0, common_1.getType)(dateTime); //两次以上使用的耗时计算进行缓存
    switch (type) {
        case "string":
            formateTime = Date.parse(dateTime);
            break;
        case "number":
            formateTime = dateTime;
            break;
        case "Date":
            formateTime = Date.prototype.valueOf.call(dateTime);
            break;
        default:
            formateTime = 0;
            break;
    }
    var offset = now - formateTime;
    var formatText;
    var computedDateTime = type !== "Date" ? new Date(dateTime) : dateTime;
    switch (true) {
        case offset > exports.week:
            formatText = "".concat(computedDateTime.getFullYear(), "-").concat((0, common_1.zero)(computedDateTime.getMonth()), "-").concat((0, common_1.zero)(computedDateTime.getDate()));
            break;
        case offset > exports.day:
            formatText = "".concat(weeks[computedDateTime.getDay()]);
            break;
        default:
            formatText = "".concat((0, common_1.zero)(computedDateTime.getHours()), ":").concat((0, common_1.zero)(computedDateTime.getMinutes()));
            break;
    }
    return formatText;
}
exports.formatText = formatText;
