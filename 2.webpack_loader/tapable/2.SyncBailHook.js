let {SyncBailHook} = require('tapable');

let hook = new SyncBailHook(['name','age']);

hook.tap('这是我的第1个监听',(name,age)=>{
  console.log(1,name,age);
});
hook.tap('这是我的第2个监听',(name,age)=>{
    console.log(2,name,age);
    return "2";//一旦有返回值就直接结束了,后面的不再执行
});
hook.tap('这是我的第3个监听',(name,age)=>{
    console.log(3,name,age);
});

hook.call('zhufeng',10);