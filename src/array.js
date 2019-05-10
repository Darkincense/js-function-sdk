function Array() {}
Array.prototype = {
  /**
   * @isArrayLike
   * @param {*} value
   * @returns Boolearn
   */
  isArrayLike: function(value) {
    return (
      value != null && typeof value != "function" && this.isLength(value.length)
    );
  },
  isArray: function(obj) {
    return (
      Object.prototype.toString
        .call(obj)
        .split(" ")[1]
        .slice(0, -1) === "Array"
    );
  },
  /**
   * 数组去重 借助indexOf()方法判断此元素在该数组中首次出现的位置下标与循环的下标是否相等
   * @param {*} arr  要去重的数组
   */
  ArrHeavy: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) != i) {
        arr.splice(i, 1); //删除数组元素后数组长度减1后面的元素前移
        i--; //数组下标回退
      }
    }
    return arr;
  },
  // 将一组类数组转换为数组
  toArray: function(obj) {
    return Array.from ? Array.from(obj) : Array.prototype.slice.call(obj);
  },

  /**
   * isContains
   * @param {*} arr
   * @param {*} current
   * @returns
   */
  isContains: function(arr, current) {
    if (Array.prototype.includes) {
      return arr.includes(current);
    }
    for (i = 0; i < arr.length && arr[i] != current; i++);
    return !(i == arr.length);
  },
  /**
   * arrayIndex
   * @param {*} array
   * @param {*} element
   * @returns
   */
  arrayIndex: function(array, element) {
    var index = array.indexOf(element);
    return index;
  },
  // 数组最大值，最小值
  max: function(arr) {
    return Math.max.apply(null, arr);
  },

  min: function(arr) {
    return Math.min.apply(null, arr);
  },
  // 从数组中随机取出一个
  randomOne: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  //去除数组中假值元素，比如undefined,null,0,"",NaN都是假值
  compact: function(arr) {
    var index = -1,
      resIndex = -1,
      result = [],
      len = arr ? arr.length : 0;
    while (++index < len) {
      var value = arr[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  },
  /**
   *
   * @param {*} arr
   * @param {*} props 数组子项排序的key
   * @param {*} type 默认正序，传 'desc`为倒序排列
   * @returns
   */
  sortBy: function(arr, props, type) {
    return arr.sort(function(a, b) {
      if (type === "desc") {
        return b[props] - a[props];
      }
      return a[props] - b[props];
    });
  },
  // 数组对象根据某一个相同的键去重
  filterByItemKey: function(arr, name) {
    var hash = {};
    return arr.reduce(function(item, next) {
      hash[next[name]] ? "" : (hash[next[name]] = true && item.push(next));
      return item;
    }, []);
  }
};
module.exports = new Array();
