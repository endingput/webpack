let modules = {
  moduleA: function (module, exports) {
    exports.value = "moduleA";
  },
  moduleB: function (module, exports) {
    exports.__esModule = true; //表示 这是一个es6模块
    exports.default = { value: "moduleB" }; // 在导出对象的defualt属性才是真正的导出对象
  },
};
function require(moduleId) {
  var module = {
    i: moduleId,
    l: false,
    exports: {},
  };

  modules[moduleId].call(module.exports, module, module.exports, require);
  return module.exports;
}
require.r = function (exports) {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module",
    });
  }
  Object.defineProperty(exports, "__esModule", {
    value: true,
    enumerable: true,
  });
};
require.d = function (exports, name, getter) {
  if (!require.o(exports, name)) {
    Object.defineProperty(exports, name, {
      enumerable: true, // 可枚举
      get: getter, // get方法
    });
  }
};
require.o = function (object, property) {
  //判断object身上有没有property属性
  //return object.hasOwnProperty(property);
  return Object.prototype.hasOwnProperty.call(object, property);
};
// create a fake namespace object 创一个模拟的命名空间对象
// mode & 1: value is a module id, require it value是一个模块ID,需要用require来加载
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object 如果已经是ns对象了,则直接返回
// mode & 8|1: behave like require 8或1 等同于require 0b1001
let mode = 0b1111;
//require.t一般来说核心 用法是用来把一个任意模块都变成一个es模块
// import('./').then(result=>)..不管你懒加载的是一个common.js es6模块,都会变成es6模块的格式
require.t = function (value, mode) {
  // 0b0001  1 true
  if (mode & 1) value = require(value); //value={value : "moduleA";}
  //0b1000  0b1001 8 true
  if (mode & 8) return value;
  //0b0100 value已经是es模块了,可以直接返回
  if (mode & 4 && typeof value === "object" && value && value.__esModule)
    return value;
  var ns = Object.create(null); //创建一个空对象
  require.r(ns); //ns.__esModule=true
  Object.defineProperty(ns, "default", {
    enumerable: true,
    value: value,
  }); //ns.default = {value : "moduleA"}
  if (mode & 2 && typeof value != "string")
    for (var key in value) {
      //ns[key] = value[key];
      require.d(
        ns,
        key,
        function (key) {
          return value[key];
        }.bind(null, key)
      );
    }
  return ns;
};

let r1 = require.t("moduleA", 0b1001);
console.log(r1); //{value : "moduleA";} 直接返回了
let r2 = require.t("moduleB", 0b0101);
console.log(r2);
let r3 = require.t("moduleA", 0b0001);
console.log(r3);
let r4 = require.t("moduleA", 0b0011);
console.log(r4);

/**
 * 1.为了性能 二进制操作是最快的 也是最节约内存的, 权限  react大量用到
 * 10101111
 *
 */
//mode 是不在不同的情况下写死 更下午会用到 mode
//1+1 2
