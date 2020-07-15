1. es6 import export 如何实现的?
2. 第三方模块的 ID 是怎么样的?
3. 为了压缩,那为什么有这么多的/\*\* 只有在开发模 式下有,生产模 式是没有的
   但是对象的属性名是不能被压缩,所以只能直接 一步到位,写的短一点

舍得
函数 call 的上下文为什么是 module.exports
modules[moduleId].call(module.exports
lessfish
能改成 export default 试试吗
XZZ
module.exports 怎么赋值的
人生只如初见
require 是 webpack 自己实现的，import 是怎么实现的呢？
kevin
问题根本没解释啊
人生只如初见
moduleId 不应该是绝对路径么？相对路径
人生只如初见
相对路径同一个第三方模块路径地址可能不一样呢 一会
10:46
188\*\*\*\*3750
那老师 你刚才执行 build 不也是 开发模式下 build

如果你得到一个模 块,但你不知道它是个 common.js esmodule,如何取值?

千城、
浏览器也是用这个值判断的吗
舍得
代码提交一下么
郑海鑫
老师面试题链接帮发一份
11:03
kevin
代码地址给一下
千城、
webpack 是不是要被 vite 替代了啊
舍得
老师发的代码库地址 没访问权限啊

common.js 加载 common.js

```js
{
  "./src/index.js": function (module, exports, require) {
    let title = require(/*! ./title */ "./src/title.js");
    console.log(title.name);
    console.log(title.age);
  },

  "./src/title.js": function (module, exports) {
    exports.name = "title_name";
    exports.age = "title_age";
  },
}
```

common.js 加载 es6

```js
{
  "./src/index.js": function (module, exports, require) {
    let title = require("./src/title.js");
    console.log(title.default);
    console.log(title.age);
  },

  "./src/title.js": function (module, exports, require) {
    //先表明这是一个es6模块
    require.r(exports);//exports.__esModule=true
    //给exports增加一个age属性,值 title_age
    require.d(exports, "age", function () {
      return age;
    });
    //默认导出如何兼容 是往导出对象上挂载一个default属性
    exports["default"] = "title_name"; //默认导出
    const age = "title_age"; //单个导出age
  }
```

//es6 加载 es6

```js
{
  "./src/index.js": function (module, exports, require) {
    require.r(exports);// exports.__esModule =true;
    var title = require("./src/title.js");
    console.log(title["default"]);
    console.log(title["age"]);
  },

  "./src/title.js": function (module, exports, require) {
    require.r(exports);//exports.__esModule =true;
    require.d(exports, "age", function () {//exports.age = 'title_age';
      return age;
    });
    exports["default"] = "title_name";
    const age = "title_age";
  },
}
```

es6 加载 common.js

```js
__webpack_require__.n = function (module) {
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module["default"];
        }
      : function getModuleExports() {
          return module;
        };
  __webpack_require__.d(getter, "a", getter);
  return getter;
};
```

```js
 {
    "./src/index.js": function (module,exports,require ) {
      require.r(exports);//exports.__esModule = true
      var title = require("./src/title.js");
      var title_default = require.n(title);
    /*   function getModuleExports() {
        return  {
            name: "title_name",
            age: "title_age",
        };
      } */
      //getModuleExports.a getter getModuleExports
      console.log(title_default.a);//{name: "title_name",age: "title_age",};
      console.log(title["age"]);
    },

    "./src/title.js": function (module, exports) {
      module.exports = {
        name: "title_name",
        age: "title_age",
      };
    },
  }
```

- 1.如果模块是用 common.js 写入,则不需要做任何的转换
- 2. 如果模块里有 export 或者 import 或者 都有
  - require.r(exports);//exports.\*\*esModule = true 此模块的导出对象上增加一个\_\_esModule 属性
  - 如果有默认导入的话 `require.n(title)`得到默认导入 title_default.a 就是默认导入了
  - 如果是批量导的话,直接 取属性就可以了

webpack 有三个核心 概念

- 模块 JS 文件 CSS 文件 图片
- 相互依赖的模块会合并成一个代码块


如何让import的css没有命名冲突,只属于这个模块?
css-loader

container


main_container_hash