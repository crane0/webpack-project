// 这是 node.js 的 path 模块
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      // 添加解析 css，是因为不止会写 less 
      {
        test: /\.css$/,
        use: [
          // 这 2个是互斥的。
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 这 2个是互斥的。
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 单位：字节
              limit: 10240,
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),

    new optimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),

    // 1个页面对应1个htmlWebpackPlugin，所以如果有多个，就需要写多个
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      // 对应的 entry 指定的 chunk（包括 css/js），可以理解为这个入口使用到的 css/js
      chunks: ['search'],
      // 将 chunk 自动插入
      inject: true,
      minify: {
        html5: true,
        // 去除空格
        collapseWhitespace: true,
        // 不保留换行符
        preserveLineBreaks: false,
        // 这2个是压缩一开始就内联在 html 中的 css/js，不是打包生成的 css/js
        minifyCSS: true,
        minifyJS: true,
        // 移除注释
        removeComments: true
      }
    })
  ]
}