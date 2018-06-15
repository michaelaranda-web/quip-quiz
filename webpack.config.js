const path = require('path');
const outputDirectory = 'public';

module.exports = {
  entry: {
    home: './client/javascript/home.js',
    quizNew: './client/javascript/quizNew.js',
    quizIndex: './client/javascript/quizIndex.js'
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].bundle.js'
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