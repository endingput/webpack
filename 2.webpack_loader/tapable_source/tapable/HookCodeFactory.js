
class HookCodeFactory{
    args(){
        //this.options.args=["name","age"]name,age
        return this.options.args.join(',');
    }
    setup(hookInstance,options){
        this.options =options;
        //给钩子实例的_x赋值,赋值 为一个fn的数组
        hookInstance._x=options.taps.map(item=>item.fn);
    }
    header(){
        return 'var _x = this._x;\n';
    }
    content(){
        //this.options={taps,args}
        let body = '';
        for(let i=0;i<this.options.taps.length;i++){
            body += `
            var _fn${i} = _x[${i}];\n
            _fn${i}(${this.args()});\n
            `;
        }
        return body;

       /*  return this.options.taps.map((item,i)=>`
            var _fn${i} = _x[${i}];\n
            _fn${i}(name, age);
        `).join('\n'); */
    }
    create(){
        //args=name,age
        return new Function(this.args(),this.header()+this.content());
    }
}

module.exports = HookCodeFactory;