

/* let str = '(add 456 33)';
let regexp = /(\()([a-z]+)\s([0-9]+)\s([0-9]+)(\))/;
let result = str.match(regexp);
console.log(result); */

let str = "3.34444 + 4.4-55*66*(77+55)";
//数字 + - * / ( ) space
let RegExpObject = /([0-9\.]+)|(\+)|(\-)|(\*)|(\/)|([\(])|([\)])|([ ]+)/g;
let types =        ['number','+','-','*','/','(',')','Space'];
function tokenize(input){
  let result = null;
  let tokens = [];
  while(true){
    result = RegExpObject.exec(input);
    if(!result) break;
    let index = result.findIndex((item,index)=>index>0&&!!item);
    let token = {type:types[index-1],value:result[0]};
    tokens.push(token);
  }
  return tokens;
}
let tokens= tokenize(str);

console.log(tokens);

//如何用正则实现分词,把上面的字符串分成下面的数组?
// 数字
// + - * /
// ( )

/**
number 33
op +
number 44
op -
number 55
op *
number 66
op *
paren (
number 77
op +
number 55
paren )
 */
