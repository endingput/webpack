const path = require('path')
const resolve = path.resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'a', 'dist'),
        filename: 'main.js',
        publicPath: '/assets'
    },
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        }]
    },
    devServer: {
        contentBase: resolve(__dirname, 'static'),
        compress: true, // 是否启动压缩
        port: 8080,
        writeToDisk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        })
    ]
}