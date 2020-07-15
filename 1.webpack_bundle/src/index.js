let url = require('./logo.png');
console.log(url);
let img = new Image();
img.src = url;
document.body.appendChild(img);
require('./title');

//import {Button} from 'antd';
//babel转换的时候可以把这一行转成
//import Button from 'antd/button';