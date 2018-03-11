import React from 'react'

import Header from './Header.jsx'
import Main from './Main.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}