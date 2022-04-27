import { platform } from "process";
import { execSync } from "child_process";

let _hasGit;
/**
 * @description 检测系统是否安装了git
 * @returns boolean
 */
export function hasGit(): boolean {
    if (_hasGit) {
        return _hasGit
    }
    try {
        execSync("git --version", { stdio: "ignore" })
        return (_hasGit = true);
    } catch (error) {
        return (_hasGit = false);
    }
}

export const isWindows = platform === "win32";
export const isMac = platform === "darwin";
export const isLinux = platform === "linux";