
import React from 'react'

import Cards from './Cards.jsx'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Cards ads={[1, 2, 3, 4, 5]} />
      </div>
    )
  }
}