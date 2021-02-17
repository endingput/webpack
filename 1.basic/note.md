## webpack的学习顺序
- webpack5实战使用
- webpack优化
- webpack工作流 ast抽象语法树
- loader
- plugin tapable
- hmr实现原理

##
- 在现代软件开发中，分包是一个非常重要的思路
- 把一个大仓库尽可能拆分成不同的小仓库，不同的模块 lerna
- webpack webpack-cli webpack-dev-serve
- 就像webpack不会把webpack和webpack-cli进行合并

## webpack-dev-server
- 使用的是内存文件系统memory-fs
# 引入图片的方式
1. 将图片放入静态资源根目录中 配置contentBase
2. 通过require/import方式引入
3. 在css中引入，由css-loader处理
4. 在html中img标签src相对路径引入，通过html-loader处理

# file-loader
1. 拷贝图片
2. 将图片模块转化成js模块