let path = require('path');
let fs = require('fs');
const loader = require('./loaders/loader-c');

//loader 绝对路径
function createLoaderObject(loader){
  let loaderObject = {data:{}};
  loaderObject.request = loader;//绝对路径
  loaderObject.normal = require(loader);
  loaderObject.pitch = loaderObject.normal.pitch;
  return loaderObject;
}
function runLoaders(options,callback){
    let loaderContext = {};//默认是一个空对象
    let {resource,loaders}=options;
    loaders=loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0;
    //loaderContext.readResource = fs.readFile;
    loaderContext.resource = resource;
    loaderContext.loaders = loaders;
    let isSync = true;//默认是同步的
    //如果调用它就表示 当前的异步loader执行结束了,要执行下一个loader
    let innerCallback = loaderContext.callback= function(err,args){
        isSync=true;
        loaderContext.loaderIndex--;
        iterateNormalLoaders(loaderContext,args,callback);
    }
    loaderContext.async = function(){
        isSync = false;//如果调用了async方法,会把状态标识从同步变成异步
        return innerCallback;
    }
    Object.defineProperty(loaderContext,'request',{
        get:function(){//loaders+resource用!连接
            return loaderContext.loaders.map(o=>o.request).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext,'reminingRequest',{
        get:function(){//当前索引加1开始,一直到最后
            return loaderContext.loaders.slice(loaderContext.loaderIndex+1).map(o=>o.request).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext,'currentRequest',{
        get:function(){//当前索引一直到最后
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(o=>o.request).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext,'previousRequest',{
        get:function(){//从0一直到当前索引的前一个
            return loaderContext.loaders.slice(0,loaderContext.loaderIndex).map(o=>o.request).concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext,'data',{
        get:function(){//当前索引一直到最后
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });

    iteratePitchingLoaders(loaderContext,callback);

    function processResource(loaderContext,callback){
        //读文件的时候没有指定编码,那么buffer就是一个Buffer的实例
        let buffer = fs.readFileSync(loaderContext.resource);
        iterateNormalLoaders(loaderContext,buffer,callback);
    }
    function iterateNormalLoaders(loaderContext,args,callback){
        if(loaderContext.loaderIndex<0){//如果索引已经小于0了,则就结束
            return callback(null,args);
        }
        let currrentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let loaderFn = currrentLoaderObject.normal;
        if(loaderFn.raw){//如果说loaderFn.raw为true
            if(!Buffer.isBuffer(args)){//如果需要buffer,但是不不是buffer,转成buffer
                args= Buffer.from(args);
            }
        }else{//需要要字符串
            if(Buffer.isBuffer(args)){
                args= args.toString('utf8');
            }
        }
        args = loaderFn.apply(loaderContext,[args]);
        if(isSync){
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext,args,callback);
        }
    }
    function iteratePitchingLoaders(loaderContext,callback){
        if(loaderContext.loaderIndex >= loaderContext.loaders.length){
            loaderContext.loaderIndex--;
            return processResource(loaderContext,callback);
        }
        let currrentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];//loader-a
        let pitchFn = currrentLoaderObject.pitch;
        if(!pitchFn){//如果当前loaderContext没有配置pitch函数,则直接向下执行
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext,callback);
        }
        //如果有pitch就让pitchFn它执行,得到返回值
        let args = pitchFn.apply(loaderContext,
            [loaderContext.reminingRequest,
            loaderContext.previousRequest,
            currrentLoaderObject.data]);
        if(args){//如果pitch有返回值的话
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(loaderContext,args,callback);
        }else{//如果没有返回值,要执行下一个loader的pitch
            loaderContext.loaderIndex++;
            iteratePitchingLoaders(loaderContext,callback);
        }   
    }
}
let entry ="./src/main.js";
let options = {
    resource:path.join(__dirname,entry),//要加载的模块
    loaders:[
        path.join(__dirname,'loaders/loader-a.js'),
        path.join(__dirname,'loaders/loader-b.js'),
        path.join(__dirname,'loaders/loader-c.js')
    ]
}
runLoaders(options,(err,result)=>{
   console.log('result',result);
});

/**
 * 一个模块可能会有多种类型的loader
 * post inline auto(normal) pre
 * [post,inline,auto,pre]
 * 
 */
/**
 * 1.raw 如果raw=true loader得到buffer,raw=false就得到字符串
 * 2. this.data 哪来的? loaderContext.data
 * 3.异步如何处理,以后如果返回多个参数?
 * 
 * .js
 * eslint pre 
 * 普通的不用说了
 * inline
 * post 后置 统计一些编译信息
 */