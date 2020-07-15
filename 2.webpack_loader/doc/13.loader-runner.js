let path = require('path');
let fs = require('fs');
const loader = require('../loaders/loader-a');

//loader 绝对路径
function createLoaderObject(loader){
  let loaderObject = {data:{}};
  loaderObject.request = loader;//绝对路径
  loaderObject.normal = require(loader);
  loaderObject.pitch = loaderObject.normal.pitch;
  return loaderObject;
}
function runLoaders(options,finishCallback){
    let loaderContext = {};//默认是一个空对象
    let {resource,loaders}=options;
    loaders=loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0;
    //loaderContext.readResource = fs.readFile;
    loaderContext.resource = resource;
    loaderContext.loaders = loaders;
    
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

    iteratePitchingLoaders(loaderContext,finishCallback);

    function processResource(loaderContext,callback){
        let buffer = fs.readFileSync(loaderContext.resource,'utf8');
        console.log('buffer',buffer);
        
        //iterateNormalLoaders(loaderContext,buffer,callback);
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
            loaderContext.reminingRequest,
            loaderContext.previousRequest,
            currrentLoaderObject.data);
        if(args){//如果pitch有返回值的话
            loaderContext.loaderIndex--;
            //return iterateNormalLoaders(loaderContext,args,callback);
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