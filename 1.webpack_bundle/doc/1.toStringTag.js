//toStringFlag
console.log(Object.prototype.toString.call("zhufeng")); //[object String]
console.log(Object.prototype.toString.call([1, 2, 3])); //[object Array]
console.log(Object.prototype.toString.call(3)); //[object Number]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call(null)); //[object Null]

console.log(Object.prototype.toString.call({ name: "zhufeng" })); //[object Object]
//如果我们想更进一步的区分类型的话
let obj = {};
//Object.defineProperty(obj, Symbol.toStringTag, { value: "Module" });
obj[Symbol.toStringTag] = "Module";
console.log(Object.prototype.toString.call(obj));
