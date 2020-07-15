let babel = require('@babel/core');//babel核心包
let arrowPlugin = require('babel-plugin-transform-es2015-arrow-functions');
let t = require('babel-types');//t判断某个节点是否是某种类型,或者说生成某种类型节点
const code = `const sum = (a,b)=>{
    console.log(this);
    return a+b;
}`;
let transformArrayFunctionPlugin ={
    visitor:{
        //这里可以写节点的type值,babel会遍历语法树,如果发现某个节点的type等于此类型的话,就会把path传过来
        ArrowFunctionExpression(path){
            let node = path.node;//path路径 node代表节点
            let id = path.parent.id;//sum identifier
            let params = node.params;//获取 老的参数数组
            //let body = t.blockStatement([t.returnStatement(node.body)]);//构建新函数的body
            let body = node.body;
            //generator如果为true表示 它是一个生成器 async function* gen(){}
            let functionExpression=t.functionExpression(id, params, body, false, false);
            let thisVariableDeclaration = t.variableDeclaration('var', [
                t.variableDeclarator(t.identifier('_this'), t.thisExpression())
            ]);
            let newNodes = [thisVariableDeclaration,functionExpression];
            //用多个节点进行替换
            path.replaceWithMultiple(newNodes);
        },
        ThisExpression(path){
            path.replaceWith(t.identifier('_this'));
        }
    }
}
const result = babel.transform(code,{
    plugins:[transformArrayFunctionPlugin]
});
console.log(result.code);
//babel本身没有任何转换的功能,只是帮你遍历而你,遇到你感兴趣的节点让你处理
/**
var _this = this;

const sum = function (a, b) {
  console.log(_this);
  return a + b;
};
 */