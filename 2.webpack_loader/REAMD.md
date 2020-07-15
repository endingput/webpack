## 基本概念
1. module
2. chunk 可能会在优化阶段进行拆分或者 合并
   chunkGroup是一个组 chunk组
3. asset 一个chunk 对应一个asset
4. file 一个asset对应一个file
- ssr里面 next服务器端渲染

## 内部
- Compiler 代表整个webpack对象 
- Compilation 编译对象 每次新的编译生成新的compilation 里面会包含 modules chunks assets files

## LOADER 
- 转换器
- 为什么需要loader? 因为在webpack,我们要分析模块依赖,而分析 需要把每个模块都变成JS模块
- 图标 图片 less sass,就需要靠loader进行转换,把任意模块转成JS模块