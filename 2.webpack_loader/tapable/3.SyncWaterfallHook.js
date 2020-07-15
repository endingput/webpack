let {SyncWaterfallHook} = require('tapable');

let hook = new SyncWaterfallHook(['name','age']);

hook.tap('这是我的第1个监听',(name,age)=>{
  console.log(1,name,age);
  return "A";
});
hook.tap('这是我的第2个监听',(name,age)=>{
    console.log(2,name,age);
    //return "B";
});
hook.tap('这是我的第3个监听',(name,age)=>{
    console.log(3,name,age);
});

hook.call('zhufeng',10);