
const path = require('path');
let webpack = require('webpack');
let  HtmlWebpackPlugin= require('html-webpack-plugin');
/* let TerserWebpackPlugin = require('terser-webpack-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') 
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');*/;
//const smv = new SpeedMeasureWebpackPlugin();
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//child_process
/**
 * 1.entry分割
 *   1.如果入口chunk包含了重复的模 块,那么这些模包会被重复打包
 *   2.不够灵活,不动将核心 应用逻辑进行动态拆分代码
 */
/**
 * html no -cache cache
 * 1.抽取第三方模块 vendors
 * 2.抽取公共模块 commons
 */
module.exports = {
  mode: 'production',//要改成生产模式
  entry:'./src/index.js',
  devtool:false,
  output:{
   // library:'calculator',//指定导出库的名称
   // libraryTarget:'global' //以何种方式导出给别人用 别人只能以全局变量方式引入
    ///commonjs2的话就library没有意义了
  },
  optimization:{
    splitChunks:{
      //代码分成二类,第一类初始化模块 异步模块
      chunks:'all',//initial async all all是全应用
      minSize:30000,//默认值是30k代码块的最小尺寸
      minChunks:1,//被多少模块共享 ,在分割之前被引用的次数
      maxAsyncRequests:1,//按需加载的最大并行请求数
      maxInitialRequests:3,//一个入口的最大并行请求数量
      name:true,//打包的名称 默认名是chunk的名字通过分隔符~分开连接在一起 pageA~pageB~pageC
      automaticNameDelimiter:'~',//默认的分隔符
      cacheGroups:{
        vendors:{
          chunks:'initial',//分割的是同步的代码块
          test:/node_modules/,//模块正则匹配表达式
          priority:-10//一个代码块可能会满足多个缓存组,会被抽取到优先级比较高的缓存组中
          //为了让自定义缓存组优先级更高(优先是0),默认缓存组的priority设置为负值
        },
        commons:{
          chunks:'initial',
          minSize:0,
          minChunks:2,//最少被2个chunk引用才会被提取
          priority:-20,
          reuseExistingChunk:true//如果该chunk引用了已经被抽取的chunk,则会直接 引用该chunk,不会重复打包
        }
      }
    }
  },
  //配置优化策略
 /*  optimization:{
    //如果当前的模式是生产模式,
    minimizer:argv.mode == 'production'?[
      new TerserWebpackPlugin({//压缩JS
        parallel:true,//启动多进程并行压缩JS
        cache:true//开始缓存
      }),
      new OptimizeCssAssetsWebpackPlugin()//压缩CSS
    ]:[]
  }, */
  //如果想找到一个模 块的是需要过非常非常复杂 node.js webpack  enhanced-resolve
  resolve:{
    alias:{
      'bootstrap':path.resolve(__dirname,'node_modules\bootstrap\dist\css\bootstrap.css')
    },
    //当找模块的时候  当前 node_modules  减少无谓的查找流程
    modules:[path.resolve(__dirname,'node_modules')],
    mainFields: ['main'],
    //mainFiles:["yy"]
  },
  resolveLoader:{

  },
  module:{
      //拿 到一个模块之后,需要转成抽象语法树分析依赖
     /*  noParse:/jquery|lodash/,
      noParse(content){
        return /jquery|lodash/.test(content);
      }, */
      rules:[
        {
          test:/\.js/,
          include:path.resolve(__dirname,'src'),
          use:[
            {
              loader:'cache-loader'
            },
              {
                  loader:'babel-loader',
                  options:{
                    //开启babel-loader的缓存
                    cacheDirectory:true,
                    //不让babel转换模块,因为只有es6 modules才能实现tree shaking
                    presets:[[
                      "@babel/preset-env",
                      {"modules":false}
                    ],"@babel/preset-react"]
                  }
              }
          ]
        },
        {
          test:/\.css/,
          include:path.resolve(__dirname,'src'),
          exclude:/node_modules/,
          use:[
            {
              loader:MiniCssExtractPlugin.loader},
             'css-loader'
          ]
        }
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'css/[name].[hash].css'
    }),
    new PurgecssPlugin({
      paths:glob.sync(`${path.resolve(__dirname,'src')}/**/*`)
    }),
    new webpack.DefinePlugin({
      PRODUCTION:JSON.stringify(true),//转成字符串
      VERSION:"1",
      EXPRESSION:"1+2",//如果配的是一个字符串,那么它会被当成代码片断来执行 eval("1+3")
      COPYRIGHT:{
        AUTHOR:JSON.stringify('zhufeng')
      }
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'pageA.html',
      chunks:["pageA"],
      //excludeChunks:['pageB','pageC']
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'pageB.html',
      chunks:["pageB"],
     // excludeChunks:['pageA','pageC']
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'pageC.html',
      chunks:["pageC"],
     // excludeChunks:['pageA','pageB']
    }),
    new HardSourceWebpackPlugin()
    //忽略掉moment模块中的locale目录
    //new webpack.IgnorePlugin(/\.\/locale/,/moment$/),
   /*  new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode:'disabled',//默认会打开一个网站,如果不想打开,可以设置禁 用
      generateStatsFile:true//是否生成stats.json文件
    }) */
  ]
}