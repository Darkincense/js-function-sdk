function dom() {}
dom.prototype = {
  // 获取单个 dom 元素
  $: function(selector, el) {
    if (!el) {
      el = document;
    }
    return el.querySelector(selector);
  },
  // 获取多个 dom 元素数组合集
  $$: function(selector, el) {
    if (!el) {
      el = document;
    }
    return Array.prototype.slice.call(el.querySelectorAll(selector));
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
  }
};

module.exports = new dom();
