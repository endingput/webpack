/**
[
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '11' },
  { type: 'number', value: '22' },
  { type: 'paren', value: ')' }
]
*/
function parser(tokens){
  //也是一个索引指针 ,指向当前的token
  let current = 0;
  function walk(){// (add 22 33)
      debugger
      let token = tokens[current];// (
       //如果类型是小括号,并是左小括号的话,说明要开启一个新的函数调用节点
      if(token.type === 'paren' && token.value == '('){
        token = tokens[++current];//add
        let node = {
            type:'CallExpression',
            name:token.value,//add
            params:[]
        }
        token = tokens[++current];//11
        //只要遇到的不是右小括号 11 
        while(token.type != 'paren' || (token.type == 'paren' && token.value !=')')){
            node.params.push(walk());//(add 2 (subtract 4 2))
            token = tokens[current];
        }
        current++;//)
        return node;
      }else if(token.type =='number'){
        current++;
        return {
            type:'NumberLiteral',
            value:token.value
        }
      }
     
  }
  let ast = {
      type:'Program',
      body:[]
  }
  while(current <tokens.length){
    ast.body.push(walk());
  }
  return ast;
}
module.exports = parser;