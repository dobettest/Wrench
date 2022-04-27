import path from "path";
/**
 *
 * @param filename 文件名称
 * @param dot 是否需要加上符号.
 * @returns extname 扩展名
 */
export function getExt(filename, dot) {
    if (filename === void 0) { filename = ""; }
    if (dot === void 0) { dot = false; }
    var extname = path.extname(filename).toLowerCase();
    return dot ? extname : extname.replace(/\.(\w+)/, '$1');
}
/**
 *
 * @param context 上下文路径
 * @param dir 路径名称
 * @returns relativepath 相对路径
 */
export function getRealativePath(context, dir) {
    if (context === void 0) { context = process.cwd(); }
    return path.join(context, dir);
}
