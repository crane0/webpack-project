/* 
  package.json 中的 test 命令，默认会找根目录下的 /test/index.js
*/

const path = require('path')

process.chdir(path.join(__dirname, 'smoke/template'))

describe('builde-webpack test care', () => {
  require('./unit/webpack-base-test')
})