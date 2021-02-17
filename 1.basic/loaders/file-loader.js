function loader(source) {
    const filename = '01589c1d6d.png'
    // 1.向输出目录写入一个文件 this.emitFile()
    // 2.返回一个js脚本
    return `module.exports = "./${filename}"`
}
// loader有一个属性raw
// raw=true loader得到的是一个二进制buffer
// raw=false 得到的是一个utf8字符串
loader.raw = true
module.exports = loader