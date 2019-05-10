function String() {}
String.prototype = {
  /**
   * 找出字符串中出现最多的那个字符并返回
   * @param {*} str  传入要查找的字符串
   */
  findMax: function(str) {
    if (str.length == 1) {
      return str;
    }
    let charObj = {};
    for (let i = 0; i < str.length; i++) {
      if (!charObj[str.charAt(i)]) {
        charObj[str.charAt(i)] = 1;
      } else {
        charObj[str.charAt(i)] += 1;
      }
    }

    let maxChar = "",
      maxValue = 1;
    for (var k in charObj) {
      if (charObj[k] >= maxValue) {
        maxChar = k;
        maxValue = charObj[k];
      }
    }

    return maxChar;
  }
};
module.exports = new String();
