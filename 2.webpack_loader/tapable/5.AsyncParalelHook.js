let {AsyncParallelHook} = require('tapable');

let hook = new AsyncParallelHook(['name','age']);

//同步
/* hook.tap('这是我的第1个监听',(name,age)=>{
  console.log(1,name,age);
});
hook.tap('这是我的第2个监听',(name,age)=>{
    console.log(2,name,age);
});
hook.tap('这是我的第3个监听',(name,age)=>{
    console.log(3,name,age);
});

hook.callAsync('zhufeng',10,(error)=>{
   console.log(error);
}); */
//异步
//promise.all();同时开始
/* console.time('cost');
hook.tapAsync('这是我的第1个监听',(name,age,callback)=>{
  setTimeout(function(){
    console.log(1);
    callback();
  },1000);
});
hook.tapAsync('这是我的第2个监听',(name,age,callback)=>{
  setTimeout(function(){
    console.log(2);
    callback();
  },2000);
});
hook.tapAsync('这是我的第3个监听',(name,age,callback)=>{
  setTimeout(function(){
    console.log(3);
    callback();
  },3000);
});

hook.callAsync('zhufeng',10,(error)=>{
   console.log(error);
   console.timeEnd('cost');
}); */


console.time('cost');
hook.tapPromise('这是我的第1个监听',(name,age)=>{
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log(1);resolve();
    },1000);
  });
});
hook.tapPromise('这是我的第2个监听',(name,age)=>{
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log(2);resolve();
    },2000);
  });
});
hook.tapPromise('这是我的第3个监听',(name,age)=>{
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log(3);resolve();
    },3000);
  });
});

hook.promise('zhufeng',10).then((result)=>{
  console.log(result);
  console.timeEnd('cost');
});
