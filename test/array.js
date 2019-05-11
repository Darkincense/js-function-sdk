const array = require("../src/array.js");
// Api: isContains
console.log(array.isContains([1, 2, 3], 1));
let arrObj = [
  {
    id: 1,
    name: "亚瑟"
  },
  {
    id: 2,
    name: "狄仁杰"
  },
  {
    id: 3,
    name: "曹操"
  }
];
// Api: addKey
array.addKey(arrObj, { isShow: false }, (v, index, array) => {
  index === array.length - 1 ? ((v.name = "铠"), (v.isShow = true)) : "";
});
console.log(arrObj);
