let babel = require('@babel/core');//babel核心包
//let transformClassesPlugin = require('babel-plugin-transform-es2015-classes');
let t = require('babel-types');//t判断某个节点是否是某种类型,或者说生成某种类型节点
const code = `
class Person {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
}
`;//20
//const code = `let delay = 2*3*4`;//24
//语法分析
//四则运算里 有三种优先级 () 优先级最高 乘除 次之 再然后就是加减 优先级是最低的
let classPlugin ={
    visitor:{
        ClassDeclaration(path){
            let node = path.node;
            let id = node.id;// Person  标签符
            let methods = node.body.body;
            let statements = [];
            methods.forEach(method=>{
                if(method.kind === 'constructor'){
                    let functionDeclaration = t.functionDeclaration(id,method.params,method.body,false,false);
                    statements.push(functionDeclaration);
                }else if(method.kind === 'method'){
                    let prototypeMemberExpression = t.memberExpression(id, t.identifier('prototype'));//Person.prototype
                    //Person.prototype.getName
                    let getNameMemberExpression = t.memberExpression(prototypeMemberExpression, method.key);
                    //Person.prototype.getName=function(){}
                    let assignmentExpression  = t.assignmentExpression('=', getNameMemberExpression, 
                    t.functionExpression(null,method.params,method.body,false,false))
                    let expressionStatement = t.expressionStatement(assignmentExpression);
                    statements.push(expressionStatement);
                }
            });
            path.replaceWithMultiple(statements);
        }
    }
}
const result = babel.transform(code,{
    plugins:[classPlugin]
});
console.log(result.code);

//BinaryExpression  a*b
//进入的时候还是一个深度优先的过程 