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
   * 对象扩展
   * @param {*} target
   * arguments obj ...
   * @returns obj
   */
  extend: function(target) {
    for (var i = 1, len = arguments.length; i < len; i++) {
      for (var prop in arguments[i]) {
        if (arguments[i].hasOwnProperty(prop)) {
          target[prop] = arguments[i][prop];
        }
      }
    }
    return target;
  },
  /**
   *
   *
   * @param {*} a dom 元素
   * @param {*} b 事件类型 click change scroll
   * @param {*} c function
   * @param {*} d  参数默认false=》冒泡，true为捕获
   */
  addEvent: function(a, b, c, d) {
    a.addEventListener
      ? a.addEventListener(b, c, d)
      : a.attachEvent("on" + b, c);
  },
  // removeEvent(objOverLay, 'click', eMsgClose)
  removeEvent: function(a, b, c, d) {
    a.removeEventListener
      ? a.removeEventListener(b, c, d)
      : a.detachEvent("on" + b, c);
  },

  setStyle: function(ele, styleObj) {
    for (var i in styleObj) {
      ele.style[i] = styleObj[i];
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
   * @param {*} href  取值的链接
   * @param {*} key   要取的值
   */
  getQueryValue: function(href, key) {
    href = href || window.location.search;
    var match = href.match(new RegExp("[?&]" + key + "=([^&]*)"));
    return (match && match[1] && decodeURIComponent(match[1])) || "";
  },
  /**
   * 四舍五入 格式化数字
   *
   * @param {*} number 8440.55
   * @param {*} fractionDigits 1 小数位数
   * @returns 8440.6
   */
  toFixed: function(number, fractionDigits) {
    var times = Math.pow(10, fractionDigits);
    var roundNum = Math.round(number * times) / times;
    return roundNum.toFixed(fractionDigits);
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
  },
  /**
   * 防抖 一定时间内连续调用只允许执行一次
   *
   * @param {*} func
   * @param {*} wait 等待时间
   * @param {*} immediate 传 true，首次调用即立即执行
   * @returns
   */
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var canApply = !timeout;
        timeout = setTimeout(function() {
          timeout = null; // 在 wait 时间后防抖函数才可以再次被触发
        }, wait);
        if (canApply) func.apply(context, args); // 第一次 !undefined 执行
      } else {
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      }
    };
  }
};

module.exports = new Core();
