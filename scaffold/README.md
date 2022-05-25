## 一、安装
```sh
npm install @dobettest/scaffold --save-dev
```

## 二、命令
### 一、start

(1)、dev运行
```sh
wrench start dev
```

### 二、template
(1)、添加模版
```sh
wrench tempate add
```
(2)、移除模版
```sh
wrench tempate remove
```
(3)、列出所有模版
```sh
wrench tempate list
```
(4)、使用模版创建项目
```sh
wrench tempate init
```

## 注意
从0.0.5版本开始，为了降低用户的使用成本，所需要的一些必要依赖，需要用户根据需要进行自定义安装,如下的依赖不是强制使用版本也不是必须安装的，用户可以根据提示进行缺失依赖安装和升级新版本。
推荐:
### 一、vue支持
1）、2.0版本需要的依赖:
```bash
npm install vue-laoder@15 -D \
npm install vue-template-compiler -D \
npm install eslint-plugin-vue -D
```
2）、3.0版本需要的依赖:
```bash
npm install vue-laoder@17 -D \
npm install eslint-plugin-vue -D
```
### 二、sass/scss支持
```bash
npm install sass-loader^12.6.0 \
npm install sass^1.51.0
```

### 三、less支持
```bash
npm install less-loader
```