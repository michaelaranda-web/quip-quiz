var webpack = require('webpack');

module.exports = {
  entry: [
    './client/javascript/index.js'
  ],
  output: { 
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss$/,
          use: [
            {
              loader: "style-loader"
            }, 
            {
              loader: "css-loader", 
                options: {
                  sourceMap: true
                }
            }, 
            {
              loader: "sass-loader", 
                options: {
                  sourceMap: true
                }
            }
          ]
      }
    ]
  }
};