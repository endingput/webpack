function fn(age) {
  console.log(this, age);
}
fn.call({ name: "zhufeng" }, 10);
