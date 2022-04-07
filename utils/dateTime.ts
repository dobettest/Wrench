import { getType, zero } from "./index";

export const minute: number = 60 * 1000;
export const hour: number = 60 * minute;
export const day: number = 24 * hour;
export const week: number = 7 * day;
export const month: number = 31 * day;
export enum weeks {
    "星期一" = 1,
    "星期二" = 2,
    "星期三" = 3,
    "星期四" = 4,
    "星期五" = 5,
    "星期六" = 6,
    "星期天" = 0
}
/**
 * @description 推断指定年份是否是闰年
 * @param year number
 * @returns boolean
 */
export function isLeapYear(year?: number): boolean {
    year = year === undefined ? new Date().getFullYear() : year;
    const condition1 = year % 4 == 0 && year % 100 != 0;
    const condition2 = year % 400 == 0
    return condition1 || condition2;
}

/**
 * @description 对指定日期进行格式化操作
 * @param dateTime string | number | Date
 * @returns string
 */
export function formatText(dateTime: string | number | Date): string {
    const now = Date.now();
    let formateTime: number;
    let type = getType(dateTime);//两次以上使用的耗时计算进行缓存
    switch (type) {
        case "string":
            formateTime = Date.parse(dateTime as string)
            break;
        case "number":
            formateTime = dateTime as number;
            break;
        case "Date":
            formateTime = Date.prototype.valueOf.call(dateTime) as number;
            break;
        default:
            formateTime = 0
            break;
    }
    const offset = now - formateTime;
    let formatText: string;
    let computedDateTime = type !== "Date" ? new Date(dateTime) : dateTime as Date;
    switch (true) {
        case offset > week:
            formatText = `${computedDateTime.getFullYear()}-${zero(computedDateTime.getMonth())}-${zero(computedDateTime.getDate())}`
            break;
        case offset > day:
            formatText = `${weeks[computedDateTime.getDay()]}`
            break;
        default:
            formatText = `${zero(computedDateTime.getHours())}:${zero(computedDateTime.getMinutes())}`
            break;
    }
    return formatText;
}