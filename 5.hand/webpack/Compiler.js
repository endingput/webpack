const {Tapable,SyncHook,SyncBailHook,AsyncParallelHook,AsyncSeriesHook} = require('tapable');
const NormalModuleFactory = require('./NormalModuleFactory');
const Compilation = require('./Compilation');
class Compiler extends Tapable{
   constructor(context){
    super();
    this.options = {};
    this.hooks = {//compiler实例上还会挂载很多钩子
      //入口选项 解析入口
      //1. 能用同步的,就不要用异步
      //2. 能并行的就不要串行
      entryOption:new SyncBailHook(["context","entry"]),
      //真正的开启构建流程 e
      make:new AsyncParallelHook(["compilation"]),
      beforeRun:new AsyncSeriesHook(["compiler"]),//运行前
      run:new AsyncSeriesHook(["compiler"]),//运行
      beforeCompile:new AsyncSeriesHook(["params"]),//编译前
      compile:new SyncHook(["params"]),//编译
      thisCompilation:new SyncHook(["compilation","params"]),//开启一次新的编译
      compilation:new SyncHook(["compilation","params"]),//创建成功一次新的compilation对象
      done:new AsyncSeriesHook(["stats"])//编译完成
    }
    this.context  = context;//compiler.context=当前的工作目录
   }
   run(callback){
    const onCompiled = (err,compilation)=>{
      callback(null,{});
    }
    this.hooks.beforeRun.callAsync(this,(err)=>{//运行前
      this.hooks.run.callAsync(this,err=>{//运行
        this.compile(onCompiled);//开始编译
      });
    });
   }
   compile(onCompiled){
    const params = this.newCompilationParams();//创建参数
    this.hooks.beforeCompile.callAsync(params,(err)=>{//编译前
      this.hooks.compile.call(params);//编译
      let compilation = this.newCompilation(params);//创建一次的compilation对象 
      //make让所有的入口同时开始编译,全部编译成功后才执行onCompiled
      //make.callAsync第二个参数是一个函数,最称为最终的回调
      //所有的注册了make钩子的函数全部都成功了完成了才会触发这个回调 Promise.all([cb1,cb2]).then(1号);
      this.hooks.make.callAsync(compilation,(err)=>{//开始编译入口 1号(make成功后的回调)
        onCompiled(err,compilation);
      });
    });
   }
   newCompilation(params){
     const compilation = new Compilation(this);
     this.hooks.thisCompilation.call(compilation,params);
     this.hooks.compilation.call(compilation,params);
    return compilation;
   }
   newCompilationParams(){
     //普通模块工厂 我们在webpack中是靠模块工厂来创建模块的
     return {
       normalModuleFactory:new NormalModuleFactory()
     }
   }
}
module.exports = Compiler;