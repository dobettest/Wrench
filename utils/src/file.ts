import path from "path";
/**
 * 
 * @param filename 文件名称
 * @param dot 是否需要加上符号.
 * @returns extname 扩展名
 */
export function getExt(filename: string = "", dot: boolean = false): string {
    const extname = path.extname(filename).toLowerCase();
    return dot ? extname : extname.replace(/\.(\w+)/, '$1');
}
/**
 * 
 * @param context 上下文路径
 * @param dir 路径名称
 * @returns relativepath 相对路径
 */
export function getRealativePath(context:string=process.cwd(),dir:string):string{
    return path.join(context,dir);
}