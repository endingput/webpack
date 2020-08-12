let esprima = require('esprima'); //可以把源码转成语法树
let estraverse = require('estraverse'); //可以遍历语法上的节点,并且可以修改语法
let escodegen = require('escodegen'); //把改造后的语法树重新生成源代码
let code = 'function ast(){}';
let astTree = esprima.parse(code);
let indent = 0; //缩进多少个空格
function padding() {
    return " ".repeat(indent);
}
estraverse.traverse(astTree, {
    enter(node) {
        console.log(padding() + "enter " + node.type);
        if (node.type === 'FunctionDeclaration') {
            node.id.name = "newAst";
        }
        indent += 2;
    },
    leave(node) {
        indent -= 2;
        console.log(padding() + "leave " + node.type);
    }
});
let newCode = escodegen.generate(astTree);
console.log(newCode);