let babel = require('@babel/core');
let t = require('babel-types');

//import {flatten,concat} from 'lodash';
//import flatten from 'lodash/flatten';
//import concat from 'lodash/concat';
const visitor = {
    ImportDeclaration(path,state={opts}){
        let specifiers =path.node.specifiers;
        let source = path.node.source;//StringLiteral loadash
        //如果配置的包名和当前引入的包名一样的说话明需要进行按需加载
        if(state.opts.library === source.value && !t.isImportDefaultSpecifier(specifiers[0])){
            let declarations = specifiers.map( specifier=>{
                let defaultSpecifier = t.importDefaultSpecifier(specifier.local);//flatten
               // import flatten from 'loadash/flatten'
                return t.importDeclaration([defaultSpecifier], t.stringLiteral(`${source.value}/${specifier.imported.name}`))
           });
           path.replaceWithMultiple(declarations);
        }
    }
   /*  ImportDeclaration:{
        //进入的时候 path代表路径state代表状态 里面有一个opts代表参数对象
        enter(path,state={opts}){
            let specifiers =path.node.specifiers;
            let source = path.node.source;//StringLiteral loadash
            //如果配置的包名和当前引入的包名一样的说话明需要进行按需加载
            if(state.opts.library === source.value && !t.isImportDefaultSpecifier(specifiers[0])){
                let declarations = specifiers.map( specifier=>{
                    let defaultSpecifier = t.importDefaultSpecifier(specifier.local);//flatten
                   // import flatten from 'loadash/flatten'
                    return t.importDeclaration([defaultSpecifier], t.stringLiteral(`${source.value}/${specifier.imported.name}`))
               });
               path.replaceWithMultiple(declarations);
            }
        }
    } */
}
module.exports = function(babel){
  return {
      visitor
  }
}