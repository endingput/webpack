//查找规则
let path = require('path');
let nodeModules = path.resolve(__dirname,'node_modules');
let request = '!!inline-loader1!inline-loader2!./style.css';
//-!
//!
//!!
let inlineLoaders = request
   .replace(/^-?!+/,"")
   .replace(/!!+/,"!")//inline-loader1!inline-loader2!./style.css
   .split('!');
let resource = inlineLoaders.pop();//./style.css
//把loader从相对路径转成绝对路径数组
//inlineLoaders=inlineLoaders.map(item=>path.resolve(nodeModules,item));
let rules = [
    {
        enforce:"pre",//指定loader的类型为 previous 要先执行
        test:/\.css?$/,
        use:["pre-loader1","pre-loader2"]
    },
    {
        test:/\.css?$/,
        use:["auto-loader1","auto-loader2"]
    },
    {
        enforce:"post",//指定loader的类型为 previous 要先执行
        test:/\.css?$/,
        use:["post-loader1","post-loader2"]
    }
]
let preLoaders = [],postLoaders=[],autoLoaders=[];
for(let i=0;i<rules.length;i++){
    let rule = rules[i];
    if(rule.test.test(resource)){
        if(rule.enforce=='pre'){
            preLoaders.push(...rule.use);
        }else if(rule.enforce=='post'){
            postLoaders.push(...rule.use);
        }else{
            autoLoaders.push(...rule.use);
        }
    }
}

let loaders = [];
if(request.startsWith('!!')){ //noPrePostAutoLoaders
    loaders=inlineLoaders;
}else if(request.startsWith('-!')){ //noPreAutoLoaders
    loaders=[...postLoaders,...inlineLoaders];
}else if(request.startsWith('!')){ //noAutoLoaders
    loaders=[...postLoaders,...inlineLoaders,...preLoaders];
}else{
    // post inline auto pre
    loaders=[...postLoaders,...inlineLoaders,...autoLoaders,...preLoaders];
}
console.log(loaders);
//eslint 代码检查的
//js eslint-loader babel-loader