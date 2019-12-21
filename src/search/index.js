import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import logo from './assets/author-icon.png'
import { commonHello } from '../../utils/index.js'
import { a } from './tree-shaking'

class Search extends React.Component {
  render() {
    commonHello()
    // a 这里虽然调用了，但执行效果没有被用到，所以tree-shaking就会将其擦除 。
    const result = a()
    return (
      <div className="search-txt">
        search1 text 111
        <img src={ logo } alt=""/>
      </div>
    )
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)