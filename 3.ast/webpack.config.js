const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            ///babel插件没有关系
              //bable-plugin-import.js
            plugins: [[path.resolve(__dirname,'bable-plugin-import.js'), { library: "lodash" }]],
          },
        },
      },
    ],
  },
  //webpack插件
  plugins:[
    
  ]
};