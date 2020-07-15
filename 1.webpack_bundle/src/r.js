let fs = require('fs');
const path = require('path');
console.log(process.cwd());

let buffer = fs.readFileSync(path.resolve(__dirname,'./logo.png'));

console.log(buffer);
console.log(buffer.length,buffer.length/1024);

