## 查找模 块的时候是如何查找

node查找模块基本相同,但有所增强

```js
require('lodashs');
```

箭头函数 转译
Promise 属于polyfill

polyfill babel-polyfill 
babel runtime
corejs3 buintin
.babelrc  presets @babel/preset-env  {}


## treeshaking 哪些会被优化掉
1. 没有导入或使用
2. 代码不可达,不会被执行
3. 代码结果没有人用
4. 那些只写不读的变量