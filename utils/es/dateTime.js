import { getType, zero } from "./common";
export var minute = 60 * 1000;
export var hour = 60 * minute;
export var day = 24 * hour;
export var week = 7 * day;
export var month = 31 * day;
export var weeks;
(function (weeks) {
    weeks[weeks["\u661F\u671F\u4E00"] = 1] = "\u661F\u671F\u4E00";
    weeks[weeks["\u661F\u671F\u4E8C"] = 2] = "\u661F\u671F\u4E8C";
    weeks[weeks["\u661F\u671F\u4E09"] = 3] = "\u661F\u671F\u4E09";
    weeks[weeks["\u661F\u671F\u56DB"] = 4] = "\u661F\u671F\u56DB";
    weeks[weeks["\u661F\u671F\u4E94"] = 5] = "\u661F\u671F\u4E94";
    weeks[weeks["\u661F\u671F\u516D"] = 6] = "\u661F\u671F\u516D";
    weeks[weeks["\u661F\u671F\u5929"] = 0] = "\u661F\u671F\u5929";
})(weeks || (weeks = {}));
/**
 * @description 推断指定年份是否是闰年
 * @param year number
 * @returns boolean
 */
export function isLeapYear(year) {
    year = year === undefined ? new Date().getFullYear() : year;
    var condition1 = year % 4 == 0 && year % 100 != 0;
    var condition2 = year % 400 == 0;
    return condition1 || condition2;
}
/**
 * @description 对指定日期进行格式化操作
 * @param dateTime string | number | Date
 * @returns string
 */
export function formatText(dateTime) {
    var now = Date.now();
    var formateTime;
    var type = getType(dateTime); //两次以上使用的耗时计算进行缓存
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
        case offset > week:
            formatText = "".concat(computedDateTime.getFullYear(), "-").concat(zero(computedDateTime.getMonth()), "-").concat(zero(computedDateTime.getDate()));
            break;
        case offset > day:
            formatText = "".concat(weeks[computedDateTime.getDay()]);
            break;
        default:
            formatText = "".concat(zero(computedDateTime.getHours()), ":").concat(zero(computedDateTime.getMinutes()));
            break;
    }
    return formatText;
}
