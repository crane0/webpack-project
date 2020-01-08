const assert = require('assert')

describe('webpack.base.js test care', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry', () => {
    assert.equal(baseConfig.entry.index, 'F:/mycode/webpack-project/builder-webpack/test/smoke/template/src/index/index.js')
  })
})