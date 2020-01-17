const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    // 暴露出的库的名字，当运行项目构建后，dist/search.xxx.js 中就会有 module.exports = library_xcvxcvcvcvvxc
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll/manifest.json'),
      context: __dirname,
      /* 
        manifest.json 用于管理模块之间的交互。
        经过 webpack 打包优化后，所有的资源都会被拆分为细小的 chunk，他们之间的交互就是通过 manifest.json 文件进行管理。
        该项目中，当这些公共资源抽离出来后，它们与引用它们的文件之间的交互，就需要通过这个 manifest.json 文件进行连接。
        所以，在生产环境打包时，先在 search/index.html 中引入， <script src="./library.dll.js"></script>
        之后将 dll/[name].dll.js 复制到 dist 目录中即可。
      */
      // 必须和 output.library 保持一致！这个 name 就是 dll/manifest.json 中 name 的属性值
      name: '[name]_[chunkhash]',
    })
  ]
}