import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import logo from './assets/author-icon.png'

class Search extends React.Component {
  render() {
    return (
      <div className="search-txt">
        search1 text
        <img src={ logo } alt=""/>
      </div>
    )
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)