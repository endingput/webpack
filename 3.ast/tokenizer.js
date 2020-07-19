/**
 * 负责把代码切成一个一个的符号 token 这个token jwt没有关系
 * token有三种()  add方法名称 11 22 数字
 * 语法分析 和语法分析 
 * 一个一个的单词 一个一个节点
 */
let LETTERS = /[a-z]/i;
let WHITE_SPACE = /\s/;
let NUMBERS = /[0-9]/;

function tokenizer(input) {
    let current = 0
    let tokens = []
    while(current < input.length) {
        let char = input[current]
        if (char === '(') {
            tokens.push({ type: 'paren', value: '(' })
            current++
            continue
        } else if (LETTERS.test(char)) {
            let value = ''
            while(LETTERS.test(char)) {
                value += char
                char = input[++current]
            }
            tokens.push({
                type: 'name',
                value
            })
            continue
        } else if (WHITE_SPACE.test(char)) {
            current++
            continue
        } else if (NUMBERS.test(char)) {
            let value = ''
            while(NUMBERS.test(char)) {
                value += char
                char = input[++current]
            }
            tokens.push({
                type: 'number',
                value
            })
            continue
        } else if (char === ')') {
            tokens.push({ type: 'paren', value: ')' })
            current++
            continue
        }
    }
    return tokens
}
console.log(tokenizer('(add 11 22)'))
module.exports = tokenizer;
/**
let LETTERS = /[a-z]/i;
let WHITE_SPACE = /\s/;
let NUMBERS = /[0-9]/;
 */
