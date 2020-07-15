/**
 * 负责把代码切成一个一个的符号 token 这个token jwt没有关系
 * token有三种()  add方法名称 11 22 数字
 * 语法分析 和语法分析 
 * 一个一个的单词 一个一个节点
 */
let LETTERS = /[a-z]/i;// a-z A-Z
let WHITE_SPACE=/\s/;
let NUMBERS=/[0-9]/;
function tokenizer(input){// (add 11 22)
    //是一个指针,指向当前遍历的索引在字符串的位置
   let current = 0;
   //tokens是一个数组,存放着我们的token
   let tokens = [];
   //循环这个字符串的每一个字符
   while(current < input.length){
       //获取到当前的字符( 第一个字符左小括号
    let char = input[current];
    if(char === '('){
        tokens.push({type:'paren',value:'('});
        current++;
        continue;
    }else if(LETTERS.test(char)){
        let value = '';
        while(LETTERS.test(char)){
            value+=char;
            char = input[++current];
        }
        tokens.push({
            type:'name',
            value// add
        });
        continue;
    }else if(WHITE_SPACE.test(char)){
        current++;
        continue;
    }else if(NUMBERS.test(char)){
        let value = '';
        while(NUMBERS.test(char)){
            value+=char;
            char = input[++current];
        }
        tokens.push({
            type:'number',
            value  // 22
        });
        continue;
    }else if(char===')'){
        tokens.push({type:'paren',value:')'});
        current++;
        continue;
    }
   }
   return tokens;
}
module.exports = tokenizer;