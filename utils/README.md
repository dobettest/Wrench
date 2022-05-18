# Wrench
A javascript library to help web developer
## 一、安装
```bash
npm install @dobettest/utils --save
```
## 函数库

### 一、公共函数
(1)、isPrimitiveValue 判断是否是基础数据类型
```javascript
isPrimitiveVale("123") //string
```
(2)、getType 获取数据类型
```javascript
getType({});//Object
```
(3)、toBase64 将文件转化为base64格式
```javascript
toBase64("c://test.png");
```
(4)、wrapperNumber 以分隔符装饰数据
```javascript
wrapperNumber(123456789);//1,234,456,789
```
(5)、expandFn 获取对一个初始值进行副作用的结果
```javascript
expandFn({
    name:'zhangsan',
    age:20
},(intialVal)=>{
    intialVal.company='xx'
    return intialVal;
})
```
### 二、时间日期
(1)、isLeapYear 判断是否是闰年
```javascript
isLeapYear(2021);//false
```

### 三、扩展MATH库
(1)、randomString 返回一个1～32长度的随机数字字符串

```javascript
randomString(6);//687341
```

(2)、isPrimitive 判断是否是素数
```javascript
isPrimitive(2);//true
```

### 四、文件路径

(1)、getExt 返回一个文件的扩展名
```javascript
getExt('e://test.png')//png
```

### 五、权限相关
(1)、checkPermission 检查一个用户是否具有相应的操作权限
```javascript
checkPermission("r", "userid:5",":")
```
(2)、给一个其他角色基于当前角色的权限授权
```javascript
grantPermission("r", "a:463",":","tony")
```

### 六、密码相关
(1)、checkPass 检查一个密码串是否达到相应的规则要求和字数要求
```javascript
checkPass("nlcs", "123a我");
```

### 更多请移步[仓库](https://github.com/dobettest/Wrench/blob/master/utils/README.md),期待各位的参与和鼓励