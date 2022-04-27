import { randomString } from "./utils/src/math";

enum permission {
    'n' = 0,
    'x' = 1,
    'w' = 2,
    'wx' = 3,
    'r' = 4,
    'rx' = 5,
    'rw' = 6,
    'rwx' = 7
}
function checkPermission(operation: keyof typeof permission, permissionCode: string, delimiter: string = ":"): boolean {
    let [authorId, originCode] = permissionCode.split(delimiter)
    //修复operation as keyof typeof permission 编译错误
    const code = Number(originCode);
    return permission[code].includes(operation as keyof typeof permission)
}
function grantPermission(operation: keyof typeof permission, permissionCode: string, delimiter: string = ":", authorId?: any): string {
    let [originAuthor, originCode] = permissionCode.split(delimiter)
    const code = Number(originCode);
    if (permission[code % 10].includes(operation)) {
        return [authorId, code * 10 + permission[operation]].join(delimiter);
    } else {
        return [authorId, permission['n']].join(delimiter)
    }
}
console.log(genSymbol(3), genWord(2))
const _hasNumber = /\d/g;
const _hasChinese = /[\u4e00-\u9fa5]/g;
const _hasLowerWord = /[a-z]/g;
const _hasUpperWord = /[a-zA-Z]/g;
const _hasSymbol = /[!@#$%^*()&]/g;
const map = {
    "n": _hasNumber,
    "c": _hasChinese,
    "l": _hasLowerWord,
    "u": _hasUpperWord,
    "s": _hasSymbol,
}
/**
 * 
 * @param len 需要生成的长度
 * @param mode 1小写,2大写,3大小写混合
 * @returns 生成的字母串
 */
function genWord(len: number = 6, mode: number = 0): string {
    const lowerWords = "abcdefghijklmnopqrstuvwxyz";//0
    const upperWords = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//1
    mode %= 2;
    let strArr = [];
    let randNum = 0;
    const randSeds = [lowerWords, upperWords].at(mode);
    const length = randSeds.length;
    for (let i = 0; i < len; i++) {
        randNum = Math.floor(Math.random() * length);
        strArr.push(randSeds.charAt(randNum))
    }
    strArr = strArr.sort(() => 1 - Math.random() * 2);
    let str = strArr.join("");
    return str;
}
/**
 * 
 * @param len 生成的长度
 * @param expand 默认为!@#$%^*()&,需要添加的扩展字符
 * @returns 生成的符号串
 */
function genSymbol(len: number = 6, expand: string = ""): string {
    const symbols = "!@#$%^*()&";
    const allSymbols = [symbols, expand].join("");
    let strArr = [];
    let length = allSymbols.length;
    let randNum = 0;
    for (let i = 0; i < len; i++) {
        randNum = Math.floor(Math.random() * length);
        strArr.push(allSymbols.charAt(randNum))
    }
    strArr = strArr.sort(() => 1 - Math.random() * 2);
    return strArr.join("");
}
function genChinese(len: number = 6, expand: string = "") {
    const words = "我是一个默认数据";
    const allWords = [words, expand].join("");
    let strArr = [];
    let randNum = 0;
    let length = allWords.length;
    for (let i = 0; i < len; i++) {
        randNum = Math.floor(Math.random() * length);
        strArr.push(allWords.charAt(randNum))
    }
    strArr = strArr.sort(() => 1 - Math.random() * 2);
    return strArr.join("");
}
function genLowerWord(len: number = 6) {
    return genWord(len, 1)
}
function genUpperWord(len: number = 6):string {
    return genWord(len, 2)
}
const handlers = {
    "n": randomString,
    "c": genChinese,
    "l": genLowerWord,
    "u": genUpperWord,
    "s": genSymbol,
}
function genPassWord(mode: string, len: number = 6, rest: string = 's') {
    try {
        if (len < mode.length) {
            throw new Error("生成长度不能小于模式长度")
        }
        const _restStr=handlers[rest](len-mode.length)
        return mode.split("").reduce((pre, item) => {
            pre.push(handlers[item](1))
            return pre;
        }, []).sort(()=>1-Math.random()*2).join("")
    } catch (error) {
        console.error(error)
    }

}
function checkPassword(mode: string, password: string, minLen: number = 8, maxLen: number = 12) {
    return mode.split("").every((item) => map[item].test(password)) && (password.length > minLen && password.length < maxLen)
}
console.log(checkPassword("nlcs", "123a我}"), genPassWord("nlus", 9))
