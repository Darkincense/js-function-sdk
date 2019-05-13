# js-function-sdk [![NPM version](https://img.shields.io/npm/v/js-function-sdk.svg?style=flat)](https://www.npmjs.com/package/js-function-sdk) [![NPM monthly downloads](https://img.shields.io/npm/dm/js-function-sdk.svg?style=flat)](https://npmjs.org/package/js-function-sdk) [![NPM total downloads](https://img.shields.io/npm/dt/js-function-sdk.svg?style=flat)](https://npmjs.org/package/js-function-sdk) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Darkincense/js-function-sdk)

> A collection of useful Javascript functions and can use every day

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

- 对象扩展

```js
Core.extend(obj);
```

- 事件监听

```js
//  Param: a dom 元素
//  Param: b 事件类型 click change scroll
//  Param: c function
//  Param: d  参数默认false=》冒泡，true为捕获
Core.addEvent(a, b, c, d);
```

- 移除事件监听

```js
//  Params: 与事件监听一致
Core.removeEvent(a, b, c, d);
```

- 设置样式

```js
//  Param: ele dom 元素
//  Param: styleObj 属性样式
Core.setStyle(ele, styleObj);
```

- 初始化页面 rem 布局

```js
// Param: designWidth 设计图尺寸
// Param: vfontSize 基本字号

Core.remInit((designWidth = 375), (vfontSize = 16));
```

- 微信 h5 登录

```js
// Param: appid 公众号 appid
// Param: fun 登录成功的回调函数
// Param: url 重新定向的域名（可省略）

Core.publicHwxLogin(appid, fun, url);
```

- 获取 url 后面的参数

```js
// Param: key 要取的值
// Param: href 取值的链接

Core.getQueryValue(href, key);
```

- 数字精度处理

```js
// Param: number 数字
// Param: fractionDigits 小数位数

Core.toFixed(number, fractionDigits);
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

## About

### Contributors

- [RainBow](https://github.com/xiaoyueyue165)
- [StuLian](https://github.com/StuLian)

### License

Copyright © 2019, [Darkincense](https://github.com/Darkincense).
Released under the [MIT License](LICENSE).
