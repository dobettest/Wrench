import { platform } from "process";
import { execSync } from "child_process";
var _hasGit;
/**
 * @description 检测系统是否安装了git
 * @returns boolean
 */
export function hasGit() {
    if (_hasGit) {
        return _hasGit;
    }
    try {
        execSync("git --version", { stdio: "ignore" });
        return (_hasGit = true);
    }
    catch (error) {
        return (_hasGit = false);
    }
}
export var isWindows = platform === "win32";
export var isMac = platform === "darwin";
export var isLinux = platform === "linux";
