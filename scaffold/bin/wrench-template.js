const fs = require("fs");
const chalk = require("chalk");
const echo = require("node-echo");
const ini = require("ini");
const extend = require('extend');
const inquirer = require("inquirer");
const { exit, getRelativePath } = require("../utils");
const { clone } = require("../utils/git");
const TEMPLATERC = getRelativePath(".templaterc", process.env.HOME);
function listTemplate() {
    let allTemplates = getAllTemplate();
    let info = ["templateName" + "         " + "Path"];
    for (var templateName in allTemplates) {
        let path = allTemplates[templateName];
        info.push(templateName + line(templateName, 12) + path);
    }
    printMsg(info);
}
function printMsg(infos) {
    infos.forEach(function (info) {
        console.log(info);
    });
}
function line(str, len) {
    var line = new Array(Math.max(1, len - str.length)).join("-");
    return " " + line + " ";
}
async function addTemplate() {
    let { templateName, path } = await inquirer.prompt([{
        name: 'templateName',
        type: 'input',
        message: 'please input your templateName',
        validate: (input) => input !== ''
    },
    {
        name: 'path',
        type: 'input',
        message: 'please input template git url',
        validate: (input) => input !== ''
    }
    ])
    let customTemplate = getAllTemplate();
    console.log(customTemplate, 'customTemplate')
    if (customTemplate[templateName]) {
        console.log(chalk.red(`${templateName} is exist`));
        return;
    }
    customTemplate[templateName] = path;
    setCustomTemplate(customTemplate, (err) => {
        if (err) {
            exit(err);
        }
        printMsg(["", "    add template " + templateName + " success", ""]);
    });
}
async function removeTemplate() {
    let customTemplate = getAllTemplate();
    let { templateName } = await inquirer.prompt([{
        name: 'templateName',
        type: 'checkbox',
        message: 'please input your templateName',
        choices: Object.keys(customTemplate)
    }
    ])
    delete customTemplate[templateName];
    setCustomTemplate(customTemplate, (err) => {
        if (err) {
            exit(err);
        }
        printMsg[("", "    remove template " + templateName + " success", "")];
    });
}
function getCustomTemplate() {
    return fs.existsSync(TEMPLATERC)
        ? ini.parse(fs.readFileSync(TEMPLATERC, "utf-8"))
        : {};
}
function setCustomTemplate(config, cbk) {
    echo(ini.stringify(config), ">", TEMPLATERC, cbk);
}
function getAllTemplate() {
    const templates = {
        'ant-degisn-pro': 'https://github.com/ant-design/ant-design-pro.git',
        'ant-vue-pro': 'https://github.com/vueComponent/ant-design-vue-pro.git'
    }
    return extend({}, templates, getCustomTemplate());
}
async function init() {
    let allTemplate = getAllTemplate();
    let { templateName, projectName } = await inquirer.prompt([{
        name: 'templateName',
        type: 'rawlist',
        message: 'please input templateName',
        choices: Object.keys(allTemplate),
        validate: (input) => input !== ''
    },
    {
        name: 'projectName',
        type: 'input',
        message: 'please input projectName',
        validate: (input) => input !== ''
    }
    ])
    let path = allTemplate[templateName];
    let targetPath = getRelativePath(projectName)
    if (fs.existsSync(targetPath)) {
        exit(projectName + " already exist in " + targetPath);
    }
    await clone(path, targetPath);
}
function template(action) {
    switch (action) {
        case 'list':
            listTemplate()
            break;
        case 'add':
            addTemplate()
            break;
        case 'remove':
            removeTemplate()
            break;
        case 'init':
            init()
            break;
        default:
            break;
    }
}
module.exports = {
    template
}