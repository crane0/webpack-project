module.exports = {
  "parser": "babel-eslint",
  // 使用数组继承多个
  "extends": "airbnb-base",
  // 开发环境下，忽略一些全局变量的检查
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  rules: {
    "max-len": 0,
    "semi": 0,
    "comma-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "global-require": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}