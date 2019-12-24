// 这是 node.js 的 path 模块
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 新版本（2019.5.29）要这样引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]
    // match 是一个数组，match[1] 就是()中匹配到的内容，也就是index.js所在的目录
    const match = entryFile.match(/src\/(.*)\/index-server\.js/)
    const pageName = match && match[1]

    // 有的话，才生成最终文件
    if (pageName) {
      entry[pageName] = entryFile
      htmlWebpackPlugins.push(
        // 1个页面对应1个 HtmlWebpackPlugin
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          // 对应的 entry 指定的 chunk（包括 css/js），可以理解为这个入口使用到的 css/js
          chunks: ['vendors', 'commons', pageName],
          // 将 chunk 自动插入
          inject: true,
          minify: {
            html5: true,
            // 去除空格
            collapseWhitespace: true,
            // 不保留换行符
            preserveLineBreaks: false,
            // 压缩一开始就内联在 html 中的 css/js，不是打包生成的 css/js
            minifyCSS: true,
            minifyJS: true,
            // 移除注释
            removeComments: true,
          },
        }),
      ) 
    }
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()


module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
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
          // 要放在 less 后，否则会报错，无法解析一些 css
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  // 指定 autoprefixer 兼容的版本
                  overrideBrowserslist: ['last 2 version', '> 1%', 'ios 7']
                })
              ]
            }
          },
          // 也要放在 less 后，否则会报错，无法解析一些 css
          {
            loader: 'px2rem-loader',
            options: {
              // 1rem = 75px
              remUnit: 75,
              // px 转换为 rem 时，保留的小数位数
              remPrecision: 8
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
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

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),

    new CleanWebpackPlugin(),

  ].concat(htmlWebpackPlugins).concat(new HTMLInlineCSSWebpackPlugin()),

  // optimization: {
  //   splitChunks: {
  //     // 分离条件1，引用大小限制，0表示不限制
  //     minSize: 0,
  //     cacheGroups: {
  //       commons: {
  //         name: 'commons',
  //         chunks: 'all',
  //         // 分离条件2，引用次数限制
  //         minChunks: 2
  //       },
  //       vendors: {
  //         test: /(react|react-dom)/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       },
  //     }
  //   }
  // }
}