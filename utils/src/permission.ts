/**
 * @description n为不具有任何权限,r为读取,w为编辑,x为执行,在数据表中也可以映射为删除权限,可以根据自己的需要去设定
 */
export enum permission {
    'n' = 0,
    'x' = 1,
    'w' = 2,
    'wx' = 3,
    'r' = 4,
    'rx' = 5,
    'rw' = 6,
    'rwx' = 7
}

/**
 * @param operation 操作表达式
 * @param permissionCode 权限码
 * @returns 是否具有权限
 */
export function checkPermission(operation: keyof typeof permission, permissionCode: string,delimiter:string=":"): boolean {
    let [authorId, originCode] = permissionCode.split(delimiter)
    const code = Number(originCode);
    //修复operation as keyof typeof permission 编译错误
    return permission[code].includes(operation as keyof typeof permission)
}
/**
 * @param operation 需要授权的操作
 * @param permissionCode 父级权限码
 */
export function grantPermission(operation: keyof typeof permission, permissionCode: string, delimiter: string = ":", authorId?: any): string {
    let [originAuthor, originCode] = permissionCode.split(":");
    const code = Number(originCode);
    if (permission[code % 8].includes(operation)) {
        return [authorId, code * 10 + permission[operation]].join(delimiter);
    } else {
        return [authorId, permission['n']].join(delimiter)
    }
}