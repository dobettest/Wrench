export const primitiveTypes = ["string", "number", "null", "undefined", "binint", "boolean"];
export const refercenceTypes = ["RegExp", "Date", "Object", "Function", "Array"];
export type primitiveTypes = number | null | undefined | symbol | string | boolean | bigint;
export type refercenceTypes = RegExp | Date | Object | Function | Array<any>
export type allType = Partial<primitiveTypes & refercenceTypes>
/**
 * @description 将数字格式化成指定格式,例如1,234,567
 * @param num 
 * @param len 
 * @returns string
 */
export function wrapperNumber(num: number | string, len: number = 3): string {
    len = Math.max(len, 1);//解决numbers out of order in {} quantifier问题
    const source = `\\d{1,${len}}(?=(\\d{${len}})+$)`;
    const reg = new RegExp(source, 'g');
    return `${num}`.replace(reg, '$&,');
}
/**
 * @description 判断是否是基础数据类型
 * @param params primitiveTypes
 * @returns boolean
 */
export function isPrimitiveValue(params: any): boolean {
    return primitiveTypes.some((type) => typeof params === type)
}
/**
 * @description 获取数据类型
 * @param param any 
 * @returns string
 */
export function getType(param: any): string {
    if (isPrimitiveValue(param)) {
        return typeof param
    } else {
        let str = Object.prototype.toString.call(param);
        return refercenceTypes.find((type) => str === `[object ${type}]`) || str;
    }
}

/**
 * @description 在小于10的数字前填充0,例如8 -> 08
 * @param num 需要转化的数字
 * @returns string 
 */
export function zero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
}
/**
 * @description 将一个文件转化成base64格式
 * @param file File 需要转化成Base64的文件
 * @returns Promise
 */
export function toBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
/**
 * 
 * @param initialValue 原始值
 * @param effect 副作用函数
 * @returns 修改后的值
 */
export function expandFn(initialValue: any, effect: Function): any {
    let fn: Function = (initialValue: any): any => initialValue;
    if (typeof effect === "function") {
        fn = effect;
    }
    let returnValue = fn(initialValue);
    if (typeof returnValue === undefined) {
        throw new Error("the return value can not be undefined")
    }
    return returnValue;
}