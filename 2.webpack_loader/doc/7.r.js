function require() {}
require.r = function (exports) {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module",
    });
  }
  Object.defineProperty(exports, "__esModule", {
    value: true,
  });
};
//其实就是把一个exports对象声明为了一个es模 块
require.r2 = function (exports) {
  exports[Symbol.toStringTag] = "Module";
  exports.__esModule = true;
};
let obj = { name: "zhufeng" };
require.r2(obj);
console.log(Object.prototype.toString.call(obj)); //[object Module]
console.log(obj);
//fdfdfdfdfdfd
