export const _hasNumber = /\d/g;
export const _hasChinese = /[\u4e00-\u9fa5]/g;
export const _hasLowerWord = /[a-z]/g;
export const _hasUpperWord = /[A-Z]/g;
export const _hasSymbol = /[!@#$%^*()&]/g;
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
 * @param mode 1小写,2大写
 * @returns 生成的字母串
 */
export function genWord(len: number = 6, mode: number = 0): string {
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
    return strArr.join("");
}
/**
 * 
 * @param len 生成的长度
 * @param expand 默认为!@#$%^*()&,需要添加的扩展字符
 * @returns 生成的符号串
 */
export function genSymbol(len: number = 6, expand: string = ""): string {
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
/**
 * 
 * @param len 生成的长度
 * @param expand 默认为我是一个默认数据,需要扩展的字符串
 * @returns 生成的中文串
 */
export function genChinese(len: number = 6, expand: string = ""): string {
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
/**
 * 
 * @param len 生成的长度
 * @returns 小写字母串
 */
export function genLowerWord(len: number = 6): string {
    return genWord(len, 1)
}
/**
 * 
 * @param len 生成的长度
 * @returns 大写字母串
 */
export function genUpperWord(len: number = 6): string {
    return genWord(len, 2)
}
/**
 * 
 * @param mode 校验模式
 * @param password 密码串
 * @param minLen 最小长度
 * @param maxLen 最大长度
 * @returns 校验结果
 */
export function checkPass(mode: string, password: string, minLen: number = 8, maxLen: number = 12): boolean {
    return mode.split("").every((item) => map[item].test(password)) && (password.length > minLen && password.length < maxLen)
}