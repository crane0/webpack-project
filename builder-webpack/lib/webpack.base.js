const glob = require('glob');
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// cwd 表示运行该文件时，如果通过 process.chdir 设置了目录，那就使用这个目录
// 将其他地方的 __dirname 修改为 projectRoot
const projectRoot = process.cwd()


const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  // 这里完全也可以直接用 map，Object.keys只是更通用的写法，
  // 假设 entry 只是有限的几个，不需要上面的遍历的话，那 entry 就是一个对象了。
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    // match 是一个数组，match[1] 就是()中匹配到的内容，也就是index.js所在的目录
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    return htmlWebpackPlugins.push(
      // 1个页面对应1个 HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        // 对应的 entry 指定的 chunk（包括 css/js），可以理解为这个入口使用到的 css/js
        chunks: ['commons', pageName],
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
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 这 2个是互斥的。
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
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
                autoprefixer({
                  // 指定 autoprefixer 兼容的版本
                  overrideBrowserslist: ['last 2 version', '> 1%', 'ios 7'],
                }),
              ],
            },
          },
          // 也要放在 less 后，否则会报错，无法解析一些 css
          {
            loader: 'px2rem-loader',
            options: {
              // 1rem = 75px
              remUnit: 75,
              // px 转换为 rem 时，保留的小数位数
              remPrecision: 8,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // function errorPlugin() {
    //   this.hooks.done.tap('done', (stats) => {
    //     if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
    //       process.exit(1);
    //     }
    //   });
    // },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
