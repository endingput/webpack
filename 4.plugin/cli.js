const webpack = require("webpack");
const webpackOptions = require("./webpack.config");
const compiler = webpack(webpackOptions);
debugger
compiler.run((err, stats) => {
  console.log(err);
});