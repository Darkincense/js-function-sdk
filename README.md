## npm-page
npm 工具包 js-function-sdk

## 安装：
npm install js-function-sdk


## 使用：
import { useSDK } from 'js-function-sdk';

let use = new useSDK();


## 检测两个对象是否相等
deepCheck  表示深度判断

use.equalObject(obj1, obj2, deepCheck)


## 检测两个数组是否相等
deepCheck  表示深度判断

use.equalArray(arr1, arr2, deepCheck)


## 检测两个函数是否相等
deepCheck  表示深度判断

use.equalFunction(fun1, fun2, deepCheck)


## 十位的时间戳转换成时间格式
hasHour 表示是否显示时分秒

use.timestampToTime(timestamp, hasHour)


## 初始化页面rem布局
designWidth   设计图尺寸

vfontSize     基本字号

use.remInit(designWidth = 375, vfontSize = 16)


## 找出字符串中出现最多的那个字符并返回
use.findMax(str)


## 数组去重
use.ArrHeavy()


## 微信h5登录
appid       公众号appid

fun         登录成功的回调函数

url         重新定向的域名（可省略）

use.publicHwxLogin(appid, fun, url)



## 获取url后面的参数
key         要取的值

href        取值的链接

use.getQueryValue(key,href)


## 从数组中随机抽出一项
use.arrayRandom(arr)


## 原生ajax请求
use.ajax({

    method:'',

    url:'',

    data:'',

    contentType:'',
    
    success: function(res){
        
    }
})