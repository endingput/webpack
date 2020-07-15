
class AsyncParallelHookCodeFactory{
    args({before,after}={}){
        let allArgs = this.options.args||[];
        if(before)allArgs=[...before,...allArgs];
        if(after)allArgs=[...allArgs,...after];
        //this.options.args=["name","age"] name,age,_callback
        return allArgs.join(',');
    }
    setup(hookInstance,options){
        this.options =options;
        //给钩子实例的_x赋值,赋值 为一个fn的数组
        hookInstance._x=options.taps.map(item=>item.fn);
    }
    header(){
        return `
        var _x = this._x;

        var _counter = ${_x.length};
        var _done = () => {
          _callback();
        };
        `;
    }
    content(){
        let body = '';
        for(let i=0;i<this.options.taps.length;i++){
            body += `
            var _fn${i} = _x[${i}];
            _fn${i}(${this.args()}, (_err0) => {
              if (--_counter === 0) _done();
            });
            `;
        }
        return body;
    }
    create(){
        //args=name,age
        return new Function(this.args({after:["_callback"]}),this.header()+this.content());
    }
}

module.exports = AsyncParallelHookCodeFactory;