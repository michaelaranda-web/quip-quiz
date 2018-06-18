var webpack = require('webpack');

module.exports = {
  entry: {
    home: './client/javascript/home.js',
    quizNew: './client/javascript/quizNew.js',
    quizIndex: './client/javascript/quizIndex.js',
    quizShow: './client/javascript/quizShow.js',
    quizResults: './client/javascript/quizResults.js'
  },
  output: { 
    path: '/',
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })  
  ]
};