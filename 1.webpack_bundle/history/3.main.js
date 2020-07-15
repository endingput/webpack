(function (modules) {
  // webpackBootstrap
  // The module cache 模块缓存是一个对象
  var installedModules = {};

  // The require function
  //在浏览器自已实现一套common.js require方法
  function require(moduleId) {
    // Check if module is in cache 检查模 块是否在缓存中存在,如果存在,则直接 返回缓存中的模块对象
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    // 为此模块ID创建一个新的模 块并且放到缓存中
    var module = (installedModules[moduleId] = {
      i: moduleId, //identify 模块ID 模 块的标识符
      l: false, //loaded 是否已经加载成功或者说初始化成功
      exports: {}, //此模块的导出对象
    });

    // Execute the module function
    // 执行模块函数 this=module.exports
    modules[moduleId].call(module.exports, module, module.exports, require);

    // Flag the module as loaded 把此模块设置为已经加载成功
    module.l = true;

    // Return the exports of the module 返回此模块的导出对象
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  //把modules对象赋给require.m属性
  require.m = modules;

  // expose the module cache
  // 把模块的缓存对象放在require.c属性上
  require.c = installedModules;

  // define getter function for harmony exports
  //为了兼容导出定义getter函数
  require.d = function (exports, name, getter) {
    if (!require.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
    }
  };

  // define __esModule on exports
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

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  require.t = function (value, mode) {
    if (mode & 1) value = require(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = Object.create(null);
    require.r(ns);
    Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    if (mode & 2 && typeof value != "string")
      for (var key in value)
        require.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  //获取 默认导出的函数 为了兼容 非harmony模块
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
    require.d(getter, "a", getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  require.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__ 公开访问路径
  require.p = "";

  // Load entry module and return exports
  //加载入口模块并且返回exports
  //require.s 指定入口模 块
  return require((require.s = "./src/index.js"));
})({
  "./src/index.js": function (module, exports, require) {
    let title = require("./src/title.js");
    console.log(title);
  },

  "./src/title.js": function (module, exports) {
    module.exports = "title";
  },
});
/**
 * 参数是一个对象
 * key是模块ID 其实就是一个相对于项目根目录的相对路径 ./src
 * 值是一个函数 是一个common.js的模块定义
 *   你写的模块代码将会成为common.js模块的函数体
 */
