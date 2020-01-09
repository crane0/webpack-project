const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: '10000ms'
})

// 因为要删除的是 template/dist ，所以要先进入 template 目录
// __dirname 表示运行当前文件所在的目录
// process.chdir 会改变运行时的工作目录
process.chdir(path.join(__dirname, 'template'))

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod')
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err)
      // 以错误码 2 退出
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))

    console.log('webpack build done, begin to mocha')

    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))

    mocha.run()
  })
})
