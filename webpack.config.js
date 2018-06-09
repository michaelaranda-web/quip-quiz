const path = require('path');
const outputDirectory = 'public';

module.exports = {
  entry: './client/javascript/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  }
};