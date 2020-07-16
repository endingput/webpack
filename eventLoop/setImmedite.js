const fs = require('fs')
const path = require('path')
fs.readFile(path.resolve(__dirname, '5.js'), () => {
    setTimeout(() => {
        console.log('setTimeout')
    })
    setImmediate(() => {
        console.log('setImmediate')
    })
})