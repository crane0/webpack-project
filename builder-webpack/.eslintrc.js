module.exports = {
  "parser": "babel-eslint",
  // 使用数组继承多个
  "extends": "airbnb-base",
  // 开发环境下，忽略一些全局变量的检查
  "env": {
    "browser": true,
    "node": true
  }
}