function require() {}
require.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};
require.d = function (exports, name, getter) {
  if (!require.o(exports, name)) {
    Object.defineProperty(exports, name, {
      enumerable: true, // 可枚举
      get: getter, // get方法
    });
  }
};
require.n = function (module) {
  //如果module.__esModule属性的话说明这个模块是一个es module,那么返回的是module.default
  //如果没有__esModule属性属性,说明这是一个普通的common.js模块,那么直接返回module
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module["default"];
        }
      : function getModuleExports() {
          return module;
        };
  //因为a是第一个英文字段,这个地方用什么都可以
  require.d(getter, "x", getter);
  return getter;
};
let commonjsModule = { name: "zhufeng" };
let getter = require.n(commonjsModule);
console.log(getter.x);

let esModule = { __esModule: true, default: { name: "zhufeng" } };
let getter2 = require.n(esModule);
console.log(getter2.x);

//当webpack得到一个模块之后,会遍历这个模块所有语句,如果发现任意一个export import节点
//就会认定这个es6模块,就会导出的时候增加__esModule=true属性
