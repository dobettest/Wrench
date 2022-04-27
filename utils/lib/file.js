"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getRealativePath = exports.getExt = void 0;
var path_1 = __importDefault(require("path"));
/**
 *
 * @param filename 文件名称
 * @param dot 是否需要加上符号.
 * @returns extname 扩展名
 */
function getExt(filename, dot) {
    if (filename === void 0) { filename = ""; }
    if (dot === void 0) { dot = false; }
    var extname = path_1["default"].extname(filename).toLowerCase();
    return dot ? extname : extname.replace(/\.(\w+)/, '$1');
}
exports.getExt = getExt;
/**
 *
 * @param context 上下文路径
 * @param dir 路径名称
 * @returns relativepath 相对路径
 */
function getRealativePath(context, dir) {
    if (context === void 0) { context = process.cwd(); }
    return path_1["default"].join(context, dir);
}
exports.getRealativePath = getRealativePath;
