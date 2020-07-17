// const { logicalExpression } = require("babel-types");

let LETTERS = /[a-z]/i; // a-z A-Z 英文字母
let WHITE_SPACE = /\s/; //空格
let NUMBERS = /[0-9]/; //数字
//状态机 状态机器 可以接收输出,返回输出
//每个状态机会根据输入的值返回一个新的状态

//html jsx  <h1 id="title">hello</h1> 
function tokenizer(input) {
    let tokens = [];
    let currentToken;

    function emit(token) {
        tokens.push(token);
    }

    function start(char) {
        if (char == '(') {
            emit({
                type: 'paren',
                value: '('
            });
            return foundParen;
        }
    }

    function foundParen(char) {
        if (LETTERS.test(char)) {
            currentToken = {
                type: 'name',
                value: ''
            };
            return name(char);
        }
    }
    //收集函数名的状态
    function name(char) {
        if (LETTERS.test(char)) {
            currentToken.value += char;
            return name;
        } else if (char === ' ') {
            emit(currentToken);
            currentToken = {
                type: 'number',
                value: ''
            }
            return number;
        }
    }

    function number(char) {
        if (NUMBERS.test(char)) {
            currentToken.value += char;
            return number;
        } else if (char === ' ') {
            emit(currentToken);
            currentToken = {
                type: 'number',
                value: ''
            }
            return number;
        } else if (char === ')') {
            emit(currentToken);
            emit({
                type: 'paren',
                value: ')'
            });
            return start;
        }
    }
    let state = start; //刚开始处于初始态
    for (let char of input) {
        state = state(char);
    }
    return tokens;
}
/**
let LETTERS = /[a-z]/i;// a-z A-Z 英文字母
let WHITE_SPACE = /\s/;//空格
let NUMBERS = /[0-9]/;//数字
 */
let tokens = tokenizer('(add 456 33)');
console.log(tokens);


module.exports = tokenizer;
//正则内部是靠状态机实现的