const core = require("../src/core.js");
// Api: type
console.log(core.type("node"));
console.log(core.type(1));
console.log(core.type(true));
console.log(core.type(function() {}));
console.log(core.type([]));
console.log(core.type({}));
console.log(core.type(null));
