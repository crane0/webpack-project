import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'

class Search extends React.Component {
  render() {
    return <div className="search-txt">search1 text</div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)