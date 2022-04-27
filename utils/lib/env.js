"use strict";
exports.__esModule = true;
exports.isLinux = exports.isMac = exports.isWindows = exports.hasGit = void 0;
var process_1 = require("process");
var child_process_1 = require("child_process");
var _hasGit;
/**
 * @description 检测系统是否安装了git
 * @returns boolean
 */
function hasGit() {
    if (_hasGit) {
        return _hasGit;
    }
    try {
        (0, child_process_1.execSync)("git --version", { stdio: "ignore" });
        return (_hasGit = true);
    }
    catch (error) {
        return (_hasGit = false);
    }
}
exports.hasGit = hasGit;
exports.isWindows = process_1.platform === "win32";
exports.isMac = process_1.platform === "darwin";
exports.isLinux = process_1.platform === "linux";
