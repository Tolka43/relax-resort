const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js'
  },
};
