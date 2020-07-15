let {SyncLoopHook} = require('tapable');

let hook = new SyncLoopHook(['name','age']);
let counter1=0;
let counter2=0;
let counter3=0;
//不停的循环执行事件函数，直到所有函数结果 result === undefined
hook.tap('这是我的第1个监听',(name,age)=>{
  console.log(1,'counter1',counter1);
  if((++counter1)==1){
    counter1=0;
    return undefined;//如果返回undefined的话就不再循环了
  }
  return true;
});
//1+1+2+1
hook.tap('这是我的第2个监听',(name,age)=>{
  console.log(2,'counter2',counter2);
  if((++counter2)==2){
    counter2=0;
    return undefined;//如果返回undefined的话就不再循环了
  }
  return true;
});
hook.tap('这是我的第3个监听',(name,age)=>{
  console.log(3,'counter3',counter3);
  if((++counter3)==3){
    counter3=0;
    return undefined;//如果返回undefined的话就不再循环了
  }
  return true;
});

hook.call('zhufeng',10);