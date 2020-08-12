let babel = require('@babel/core'); //babel核心包
let arrowPlugin = require('babel-plugin-transform-es2015-arrow-functions');
let t = require('babel-types'); //t判断某个节点是否是某种类型,或者说生成某种类型节点
const code = `let delay = (2+3)*4`; //20
//const code = `let delay = 2*3*4`;//24
//语法分析
//四则运算里 有三种优先级 () 优先级最高 乘除 次之 再然后就是加减 优先级是最低的
let preCalculatePlugin = {
    visitor: {
        //如果发现某一个节点它的类型是二进制表达式
        BinaryExpression(path) {
            console.log(path.node.type, path.node.operator);
            //path代表当前 路径 path.node代表此路径上的节点
            //parentPath 父路径 path.parent 父路径上的节点
            let node = path.node;
            let left = node.left; //NumericLiteral 1000
            let right = node.right; //NumericLiteral 60
            let operator = node.operator; //操作符 *
            //如果说左边和右边都是数字面量的话,就可以进行计算了
            if (!isNaN(left.value) && !isNaN(right.value)) {
                let result = eval(left.value + operator + right.value); //1000*60
                path.replaceWith(t.numericLiteral(result));
                if (path.parent && path.parent.type == 'BinaryExpression') {
                    preCalculatePlugin.visitor.BinaryExpression(path.parentPath);
                }
            }

        }
    }
}
const result = babel.transform(code, {
    plugins: [preCalculatePlugin]
});
console.log(result.code);

//BinaryExpression  a*b
//进入的时候还是一个深度优先的过程 