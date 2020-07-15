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
    //node里module node给的
    //webpack打包后代码里module哪来的?自己创建的

    // Execute the module function
    // 执行模块函数 this=module.exports
    //fn.call(this指针,模 块对象,模 块的导出对象,require函数)
    //fn(module, module.exports, require);
    modules[moduleId].call(module.exports, module, module.exports, require);

    // Flag the module as loaded 把此模块设置为已经加载成功
    module.l = true;

    // Return the exports of the module 返回此模块的导出对象
    return module.exports;
  }
  // Load entry module and return exports
  //加载入口模块并且返回exports
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
/**
看下 require方法
千城、
这么多引入 都在传入自执行函数的实参吗
舍得
函数 call 的上下文为什么是module.exports
lessfish
能改成 export default 试试吗
XZZ
module.exports怎么赋值的
 
 * 
 * 
 */
