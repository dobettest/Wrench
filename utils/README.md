# Wrench
A library to help web developer,it include a scaffold to build development env,such as `nvm`,`nrm` eg

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
toBase64("c://test.png");//
```
(4)、wrapperNumber 以分隔符装饰数据
```javascript
wrapperNumber(123456789);//1,234,456,789
```
### 二、时间日期
(1)、isLeapYear 判断是否是闰年
```javascript
isLeapYear(2020);//true
```

### 三、扩展MATH库
(1)、randomString 返回一个1～32长度的随机数字字符串

```javascript
randomString(6);//687342
```

(2)、isPrimitive 判断是否是素数
```javascript
isPrimitive(2);//true
```