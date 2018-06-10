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
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};