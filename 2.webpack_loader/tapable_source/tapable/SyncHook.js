
let Hook = require('./Hook');
let HookCodeFactory= require('./HookCodeFactory');
let factory = new HookCodeFactory();
class SyncHook extends Hook{
    constructor(args){
        super(args);
    }
    compile(options){
        //this钩子的实例 options参数对象taps args
        factory.setup(this,options);
        return factory.create(options);
    }
}
module.exports = SyncHook;