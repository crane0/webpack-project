const assert = require('assert')

describe('webpack.base.js test care', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry', () => {
    assert.equal(baseConfig.entry.index.indexOf('/test/smoke/template/src/index/index.js') > -1, true)
  })
})
