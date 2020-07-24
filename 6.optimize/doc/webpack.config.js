
const path = require('path');
let webpack = require('webpack');
let  HtmlWebpackPlugin= require('html-webpack-plugin');
let TerserWebpackPlugin = require('terser-webpack-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smv = new SpeedMeasureWebpackPlugin();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//child_process
module.exports = {
  mode: 'development',
  entry:'./src/index.js',
  devtool:false,
  output:{
    library:'calculator',//指定导出库的名称
    libraryTarget:'var' //以何种方式导出给别人用
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
                  loader:'babel-loader',
                  options:{
                    presets:["@babel/preset-env","@babel/preset-react"]
                  }
              }
          ]
        }
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION:JSON.stringify(true),//转成字符串
      VERSION:"1",
      EXPRESSION:"1+2",//如果配的是一个字符串,那么它会被当成代码片断来执行 eval("1+3")
      COPYRIGHT:{
        AUTHOR:JSON.stringify('zhufeng')
      }
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    //忽略掉moment模块中的locale目录
    //new webpack.IgnorePlugin(/\.\/locale/,/moment$/),
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode:'disabled',//默认会打开一个网站,如果不想打开,可以设置禁 用
      generateStatsFile:true//是否生成stats.json文件
    })
  ]
}