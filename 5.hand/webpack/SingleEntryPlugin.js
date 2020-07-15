
class SingleEntryPlugin{
    /**
     * @param {*} context 根目录  C:\anormal\zhufengwebpack2020\5.hand
     * @param {*} entry  入口路径 ./src/index.js
     * @param {*} name  入口的名称  main
     */
    constructor(context,entry,name){
        this.context = context;
        this.entry = entry;
        this.name = name;
    }
    apply(compiler){
        //监听make事件                                       0号(表示一个钩子函数完成了)
        compiler.hooks.make.tapAsync('SingleEntryPlugin',(compilation,callback)=>{//2号(make钩子函数1)
            console.log('开始真正的编译入口 ',this.entry);
            callback();
            //开始真正的编译入口
            //compilation.addEntry(this.context,this.entry,this.name,callback);
        });
    }
}

module.exports = SingleEntryPlugin;