const path = require('path');
const outputDirectory = 'public';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    home: './client/javascript/home.js',
    quizNew: './client/javascript/quizNew.js',
    quizIndex: './client/javascript/quizIndex.js',
    quizShow: './client/javascript/quizShow.js',
    quizResults: './client/javascript/quizResults.js'
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss$/,
        use: 
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
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
          })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};