function Core() {}

Core.prototype = {
  /**
   * 返回指定变量的数据类型
   * @param  {Any} data
   * @return {String}
   */
  type: function(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
  },

  /**
   * 判断两个对象是否相等
   * 浅度判断：
   * 1.只判断obj的第一层属性总数是否一样
   * 2.值的===判断是否为真
   * 深度判断：
   * 值为对象，参考本规则
   * 值为数组，参考equalArray的深度判断
   * 值为其他类型，用===判断
   * @param  {[type]} obj1
   * @param  {[type]} obj2
   * @param  {[type]} deepCheck
   * @return {[type]}
   */
  equalObject: function(obj1, obj2, deepCheck) {
    if (obj1 === obj2) {
      return true;
    }
    // 属性总数不等，直接返回false
    var size1 = 0;
    for (var key in obj1) {
      size1++;
    }
    var size2 = 0;
    for (var key in obj2) {
      size2++;
    }
    if (size1 !== size2) {
      return false;
    }

    if (!deepCheck) {
      // 浅度判断
      for (var key in obj1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    }
    var type1, type2;
    for (var key in obj1) {
      type1 = this.type(obj1[key]);
      type2 = this.type(obj2[key]);
      if (type1 !== type2) {
        return false;
      }
      if (type1 === "Object") {
        if (!this.equalObject(obj1[key], obj2[key], true)) {
          return false;
        }
      } else if (type1 === "Array") {
        if (!this.equalArray(obj1[key], obj2[key], true)) {
          return false;
        }
      } else if (type1 === "Function") {
        if (!this.equalFunction(obj1[key], obj2[key], true)) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  },

  /**
   * 判断两个数组是否相等
   * 浅度相等：两数组toString一样
   * 深度相等的判断规则：
   * 1.长度相等
   * 2.俩数组的每一项：
   * 若为数组：参考本函数规则。
   * 若为对象：参考equalObject的规则。
   * 其他的数据类型，要求===判断为true
   * @param  {[type]} arr1
   * @param  {[type]} arr2
   * @param  {[type]} deepCheck
   * @return {[type]}
   */
  equalArray: function(arr1, arr2, deepCheck) {
    if (arr1 === arr2) {
      return true;
    }
    // 长度不等，不用继续判断
    if (arr1.length !== arr2.length) {
      return false;
    }
    // 浅度检查
    if (!deepCheck) {
      return arr1.toString() === arr2.toString();
    }
    // 判断每个基本数据类型是否一样
    var type1, type2; // 数组每一项的数据类型
    for (var i = 0; i < arr1.length; i++) {
      type1 = this.type(arr1[i]);
      type2 = this.type(arr2[i]);

      // 数据类型不一样，无需判断
      if (type1 !== type2) {
        return false;
      }

      if (type1 === "Array") {
        if (!this.equalArray(arr1[i], arr2[i], true)) {
          return false;
        }
      } else if (type1 === "Object") {
        if (!this.equalObject(arr1[i], arr2[i], true)) {
          return false;
        }
      } else if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  },

  /**
   * 对比两个function是否一样
   * 主要对比两者toString是否一样，
   * 对比会去掉函数名进行对比，其它哪怕差个回车都会返回false
   *
   * @param  {[type]} fn1
   * @param  {[type]} fn2
   * @return {[type]}
   */
  equalFunction: function(fn1, fn2) {
    var type1 = this.type(fn1),
      type2 = this.type(fn2);
    if (type1 !== type2 || type1 !== "Function") {
      return false;
    }
    if (fn1 === fn2) {
      return true;
    }
    var reg = /^function[\s]*?([\w]*?)\([^\)]*?\){/;
    var str1 = fn1.toString().replace(reg, function($, $1) {
      return $.replace($1, "");
    });
    var str2 = fn2.toString().replace(reg, function($, $1) {
      return $.replace($1, "");
    });
    // console.log(str1, str2);
    if (str1 !== str2) {
      return false;
    }
    return true;
  },

  /**
   * 时间戳转换成时间
   * @param {*} timestamp 时间戳
   * @param {*} hasHour 是否显示带有时分秒
   */
  timestampToTime: function(timestamp, hasHour) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + "-";
    M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    D = date.getDate() + " ";
    h = date.getHours() + ":";
    m = date.getMinutes() + ":";
    s = date.getSeconds();

    if (hasHour) {
      return Y + M + D + h + m + s;
    } else {
      return Y + M + D;
    }
  },

  /**
   * 初始化rem单位适配
   * @param {*} designWidth  设计图宽度
   */
  remInit: function(designWidth = 375, vfontSize = 16) {
    var resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize",
      setRemResponse = function() {
        // var vM = 375;
        var vM = designWidth;
        // var vfontSize = 16;
        var vfontSize = vfontSize;
        var html = document.documentElement;
        var newfontSize = (vfontSize * html.clientWidth) / vM;
        html.style.fontSize = newfontSize + "px";
      };
    document.addEventListener("DOMContentLoaded", setRemResponse, false);
    window.addEventListener(resizeEvt, setRemResponse, false);
  },

  /**
   * 公众号页面微信登录
   * @param {*} appid     公众号的appid
   * @param {*} fun       登录成功的回调函数
   * @param {*} url       重新定向的域名
   */
  publicHwxLogin: function(appid, fun, url) {
    var appId = appid; // 正式
    var codeUrl = "";
    var baseUrl = url ? url : window.location.href;
    var redirect_uri = baseUrl + "?login=1";

    var scope = "snsapi_userinfo";
    var state = "userinfo"; //带这个参数的好处就是防止非法的请求。

    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
    url = url + "appid=" + appId;
    url = url + "&redirect_uri=" + encodeURI(redirect_uri);
    url = url + "&response_type=code";
    url = url + "&scope=" + scope;

    if (state != null) {
      url = url + "&state=" + state;
    }
    url = url + "#wechat_redirect"; //进行URL的拼接

    if (window.location.href.indexOf("login") < 0) {
      codeUrl = url;
      window.location.href = url; //调用http请求的，进行微信授权
    } else {
      var code = this.getQueryValue("code", codeUrl);
      fun(code);
    }
  },
  /**
   * 获取url后面的参数
   * @param {*} key   要取的值
   * @param {*} href  取值的链接
   */
  getQueryValue: function(key, href) {
    href = href || window.location.search;
    var match = href.match(new RegExp("[?&]" + key + "=([^&]*)"));
    return (match && match[1] && decodeURIComponent(match[1])) || "";
  },

  /* 封装ajax函数
   * @param {string}opt.type http连接的方式，包括POST和GET两种方式
   * @param {string}opt.url 发送请求的url
   * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
   * @param {object}opt.data 发送的参数，格式为对象类型
   * @param {function}opt.success ajax发送并接收成功调用的回调函数
   */
  ajax: function(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || "POST";
    opt.url = opt.url || "";
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.contentType =
      opt.contentType || "application/x-www-form-urlencoded;charset=utf-8";
    opt.success = opt.success || function() {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var params = [];
    for (var key in opt.data) {
      params.push(key + "=" + opt.data[key]);
    }
    var postData = params.join("&");
    if (opt.method.toUpperCase() === "POST") {
      xmlHttp.open(opt.method, opt.url, opt.async);
      xmlHttp.setRequestHeader("Content-Type", opt.contentType);
      xmlHttp.send(postData);
    } else if (opt.method.toUpperCase() === "GET") {
      xmlHttp.open(opt.method, opt.url + "?" + postData, opt.async);
      xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response = JSON.parse(xmlHttp.responseText);
        opt.success(response);
      }
    };
  }
};

//此时，People就被视为构造函数，可以用new来实例化了
module.exports = new Core();
