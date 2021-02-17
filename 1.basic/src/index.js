import './index.css'
import './less.less'
import './sass.scss'
const title  = require('./hello.txt')
document.write(title.default)

const logo = require('./images/weakmap.png')
const image = new Image()
console.log(logo)
image.src = logo
document.body.appendChild(image)

// const a = require('./a.json')
// console.log(a)