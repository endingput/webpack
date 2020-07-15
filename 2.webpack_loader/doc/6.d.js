/* function require() {}
//Object.prototype.hasOwnProperty简写
require.o = function (object, property) {
  //判断object身上有没有property属性
  //return object.hasOwnProperty(property);
  return Object.prototype.hasOwnProperty.call(object, property);
};
//给exports添加一个属性,属性的取值 方式就是getter
require.d = function (exports, name, getter) {
  if (!require.o(exports, name)) {
    Object.defineProperty(exports, name, {
      enumerable: true, // 可枚举
      get: getter, // get方法
    });
  }
};

let obj = { name: "zhufeng" };
require.d(obj, "age", function () {
  return 10;
});
console.log(obj.age);

//return object.hasOwnProperty(property);
return Object.prototype.hasOwnProperty.call(object, property); */
let obj2 = { name: "zhufeng" };
obj2.hasOwnProperty = function () {};
console.log(obj2.hasOwnProperty("name"));
console.log(Object.prototype.hasOwnProperty.call(obj2, "name"));
