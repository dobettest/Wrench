/**
 * @description n为不具有任何权限,r为读取,w为编辑,x为执行,在数据表中也可以映射为删除权限,可以根据自己的需要去设定
 */
export var permission;
(function (permission) {
    permission[permission["n"] = 0] = "n";
    permission[permission["x"] = 1] = "x";
    permission[permission["w"] = 2] = "w";
    permission[permission["wx"] = 3] = "wx";
    permission[permission["r"] = 4] = "r";
    permission[permission["rx"] = 5] = "rx";
    permission[permission["rw"] = 6] = "rw";
    permission[permission["rwx"] = 7] = "rwx";
})(permission || (permission = {}));
/**
 * @param operation 操作表达式
 * @param permissionCode 权限码
 * @returns 是否具有权限
 */
export function checkPermission(operation, permissionCode, delimiter) {
    if (delimiter === void 0) { delimiter = ":"; }
    var _a = permissionCode.split(delimiter), authorId = _a[0], originCode = _a[1];
    var code = Number(originCode);
    //修复operation as keyof typeof permission 编译错误
    return permission[code].includes(operation);
}
/**
 * @param operation 需要授权的操作
 * @param permissionCode 父级权限码
 */
export function grantPermission(operation, permissionCode, delimiter, authorId) {
    if (delimiter === void 0) { delimiter = ":"; }
    var _a = permissionCode.split(":"), originAuthor = _a[0], originCode = _a[1];
    var code = Number(originCode);
    if (permission[code % 8].includes(operation)) {
        return [authorId, code * 10 + permission[operation]].join(delimiter);
    }
    else {
        return [authorId, permission['n']].join(delimiter);
    }
}
