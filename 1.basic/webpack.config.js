const path = require('path')
const resolve = path.resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|bmp|jpeg)/,
                use: [
                    // {
                    //     // file-loader将图片拷贝到dist目录中
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[hash:10].[ext]',
                    //         // esModule属性默认为true 默认包装为es6模块 require一个图片需要通过logo.default取到新路径 
                    //         // esModule属性为false 不需要通过default属性去取值
                    //         esModule: false
                    //     }
                    // },
                    {
                        // url-loader是对file-loader的增强 多了limit属性 内部用file-loader来实现的
                        loader: 'url-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            // 如果图片体积小于8k 则转成base64字符串内嵌到html中 大于8k和file-loader的行为一致
                            limit: 8*1024,
                            esModule: false
                        }
                    }
                ]
            },
            // html写相对路径 通过
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    },
    devServer: {
        contentBase: resolve(__dirname, 'static'),
        compress: true, // 是否启动压缩
        port: 8080,
        // writeToDisk: true,
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        })
    ]
}