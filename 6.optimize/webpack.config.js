
const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin.js');
module.exports = {
  mode: 'development',
  entry:'./src/index.js',
  module:{
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
   new DllReferencePlugin({
     manifest:require('./dist/react.manifest.json')
   })
  ]
}