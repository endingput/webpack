function fn(arr, start, end) {
    if (typeof start !== "number") return false;
    if (typeof end !== "number") return false;
    arr.push(start);
    if (start === end) return arr;
    return fn(arr, start + 3, end);
}
let arr = [];
fn(arr, 3, 9);
console.log(arr);