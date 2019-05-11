function Date() {}
Date.prototype = {
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
  }
};
module.exports = new Date();
