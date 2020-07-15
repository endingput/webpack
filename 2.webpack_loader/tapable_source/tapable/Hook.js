
class Hook{
    constructor(args){
        if(!Array.isArray(args)){
            args=[];
        }
        this.args = args;//保存传入的args,它是用来拼装 最后生成的call方法的参数字符串 name,age
        this.taps = [];//存放钩子函数对象
        this._x = undefined;//这个后来用来放钩子函数
    }
    tap(options,fn){
       if(typeof options === 'string'){
           options = {name:options};
       }
       options.fn = fn;//{name:'1',fn}
       this._insert(options);
    }
    _insert(options){
        this.taps[this.taps.length]=options;
        //this.taps.push(options);
    }
    call(...args){//args=[name,age]
        //动态的编译出来一个call方法new Function
        let callMethod = this._createCall();
        //然后传入参数让它执行
        return callMethod.apply(this,args);
    }
    _createCall(){
        //调用compile方法进行编译 把taps 参数字符串数组都传过去
        return this.compile({
            taps:this.taps,
            args:this.args
        });
    }/* 
    compile(){
        throw new Error('此方法需要子类去实现,不能直接调用');
    } */
}
module.exports = Hook;