const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'bundle': './public/js/app.js',
    'bundleClient': './public/js/appClient.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname,'public/dist')
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}