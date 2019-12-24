module.exports = {
  "parser": "babel-eslint",
  // 使用数组继承多个
  // "extends": "airbnb",
  // 开发环境下，忽略一些全局变量的检查
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    // 分号
    "semi": 0,
    // 尾随逗号
    "comma-dangle": 0
  }
}