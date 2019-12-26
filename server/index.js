if (typeof window === 'undefined') {
  global.window = {}
}

// fs 用于文件的读取
const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')
// 如果不设置为 utf-8，读取的就是二进制文件
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const data = require('./data.json')


const server = (port) => {
  const app = express()

  // 设置静态目录
  app.use(express.static('dist'))

  app.use('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('server is running:' + port)
  })
}

server(process.env.PORT || 3000)

const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data)
  return template.replace('<!-- HTML_PLACEHOLDER -->', str)
    .replace('<!-- INITIAL_DATA_PLACEHOLDER -->', `<script>window.__initial_data=${dataStr}</script>`)
}