import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import logo from './assets/author-icon.png'
import { commonHello } from '../../utils/index.js'

class Search extends React.Component {
  render() {
    commonHello()
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