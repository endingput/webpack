let SingleEntryPlugin = require('./SingleEntryPlugin');
class EntryOptionPlugin {
    apply(compiler){
        //当有一个entryOption事件钩子触发的时候,会执行回调,并传入context和entry
        //context永远指向当前的根目录 entry ./src/index.js
        compiler.hooks.entryOption.tap('EntryOptionPlugin',(context,entry)=>{
            //创建SingleEntryPlugin
            new SingleEntryPlugin(context,entry,'main').apply(compiler);
        });
    }
}
module.exports = EntryOptionPlugin;