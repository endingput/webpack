let Hook = require('./Hook');
let AsyncParallelHookCodeFactory= require('./AsyncParallelHookCodeFactory');
let factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook{
    constructor(args){
        super(args);
    }
    tapAsync(options,fn){
        if(typeof options === 'string'){
            options = {name:options};
        }
        options.fn = fn;//{name:'1',fn}
        this._insert(options);
     }
    callAsync(...args){//args=[name,age]
        //动态的编译出来一个call方法new Function
        let callMethod = this._createCall();
        //然后传入参数让它执行
        return callMethod.apply(this,args);
    }
    compile(options){
        //this钩子的实例 options参数对象taps args
        factory.setup(this,options);
        return factory.create(options);
    }
}
module.exports = AsyncParallelHook;