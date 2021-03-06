// import React from 'react'
// import './search.less'
// import logo from './assets/author-icon.png'

const React = require('react')
const logo = require('./assets/author-icon.png')
require('./search.less')

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Text: null,
    }
  }

  // 动态引入
  loadComponent() {
    import('./test').then((Text) => {
      this.setState({
        Text: Text.default(),
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div className="search-txt">
        {Text}
        search1 text 111
        <img src={logo.default} alt="" onClick={this.loadComponent.bind(this)} />
      </div>
    )
  }
}

module.exports = <Search />