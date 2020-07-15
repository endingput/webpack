let tokenizer = require('./tokenizer');
let parser = require('./parser');
let transformer = require('./transformer');
let codeGenerator = require('./codeGenerator');
let tokens = tokenizer('(add 1 (sub 4 3))');///add(1,sub(4,3));
//let tokens = tokenizer('(add 22 33)');
//console.log(tokens);
let ast = parser(tokens);
let newAst = transformer(ast);
let newCode = codeGenerator(newAst);
console.log(newCode);
//console.log(JSON.stringify(ast,null,2));
//console.log(JSON.stringify(newAst,null,2));

//console.log(JSON.stringify(ast,null,2));
/* traverse(ast,{
    Program(node,parent){
        console.log(node);
    },
    CallExpression(node,parent){
        console.log(node);
    },
    NumberLiteral(node,parent){
        console.log(node);
    }
}); */
/* traverse(ast,{
    Program:{
        enter(node,parent){
            console.log('enter',node.type);
        },
        leave(node,parent){
            console.log('leave',node.type);
        }
    },
    CallExpression:{
        enter(node,parent){
            console.log('enter',node.type);
        },
        leave(node,parent){
            console.log('leave',node.type);
        }
    },
    NumberLiteral:{
        enter(node,parent){
            console.log('enter',node.type);
        },
        leave(node,parent){
            console.log('leave',node.type);
        }
    }
}); */