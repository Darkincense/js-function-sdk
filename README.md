# js-function-sdk

> A collection of useful Jascript functions and can use every day

## Install

```js
npm install js-function-sdk
```

## Core

> Core module

### Usage

```js
import { Core } from "js-function-sdk";
```

- 判断数据类型

```js
// Return: String、Number、Boolean、Function、Array、Object、Null
Core.type(obj);
```

- 检测两个对象是否相等

```js
// Argument: deepCheck 表示深度判断

Core.equalObject(obj1, obj2, deepCheck);
```

- 检测两个数组是否相等

```js
Core.equalArray(arr1, arr2, deepCheck);
```

- 检测两个函数是否相等

```js
Core.equalFunction(fun1, fun2, deepCheck);
```

- 十位的时间戳转换成时间格式

```js
// Argument: hasHour 表示是否显示时分秒
Core.timestampToTime(timestamp, hasHour);
```

- 初始化页面 rem 布局

```js
// Argument: designWidth 设计图尺寸
// Argument: vfontSize 基本字号

Core.remInit((designWidth = 375), (vfontSize = 16));
```

- 微信 h5 登录

```js
// Argument: appid 公众号 appid
// Argument: fun 登录成功的回调函数
// Argument: url 重新定向的域名（可省略）

Core.publicHwxLogin(appid, fun, url);
```

- 获取 url 后面的参数

```js
// Argument: key 要取的值
// Argument: href 取值的链接

Core.getQueryValue(key, href);
```

- 原生 ajax 请求

```js
Core.ajax({
  method: "",
  url: "",
  data: "",
  contentType: "",
  success: function(res) {}
});
```
