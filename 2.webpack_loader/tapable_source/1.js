let {SyncHook} = require('./tapable');
let hook = new SyncHook(['name','age']);
hook.tap('1',(name,age)=>{
  console.log(1,name,age);
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
hook.tap('4',(name,age)=>{
  console.log(4,name,age);
});
hook.call('zhufeng',10);


//let sum = new Function('a,b',"return a+b");
//console.log(sum(1,2));
/**
(function anonymous(name, age) {
  var _x = this._x;
  
  var _fn0 = _x[0];
  _fn0(name, age);
  
  var _fn1 = _x[1];
  _fn1(name, age);
  
  var _fn2 = _x[2];
  _fn2(name, age);
})
 */