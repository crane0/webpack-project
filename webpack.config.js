// 这是 node.js 的 path 模块
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    search1: './src/search.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      },
    ]
  }
}