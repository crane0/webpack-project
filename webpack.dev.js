// 这是 node.js 的 path 模块
const path = require('path')
const glob = require('glob')
// HotModuleReplacementPlugin 是 webpack 内置的插件
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 新版本（2019.5.29）要这样引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  // entryFiles ['F:/mycode/webpack-project/src/index/index.js','F:/mycode/webpack-project/src/search/index.js']
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  // 这里完全也可以直接用 map，Object.keys只是更通用的写法，
  // 假设 entry 只是有限的几个，不需要上面的遍历的话，那 entry 就是一个对象了。
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]
    // match 是一个数组，match[1] 就是()中匹配到的内容，也就是index.js所在的目录
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]

    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      }),
    )
  })

  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 单位：字节
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: './dist',
    hot: true,
     // stats: 'errors-only'
  },
  devtool: 'cheap-eval-source-map'
}
