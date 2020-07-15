let {SyncHook} = require('tapable');
/**
 * 每个钩子都是一个类 构造函数,参数是字符串数组,表示参数的列表
 * 参数的名字是随便写的,参数的长度是有意义
 * 如果没有参数就传一个空数组
 */
let hook = new SyncHook(['a','b']);
//events on 注册监听 tap
//dom.addEventListener((event)=>{});
//dom.dispatchEvent(event);
//第一个参数是监听的名称,没有用
hook.tap('这是我的第1个监听',(name,age)=>{
  console.log(1,name,age);
});
hook.tap('这是我的第2个监听',(name,age)=>{
    console.log(2,name,age);
});
hook.tap('这是我的第3个监听',(name,age)=>{
    console.log(3,name,age);
});
//执行钩子,触发钩子执行
//Function.prototype.call
hook.call('zhufeng',10);