
import React from 'react'

import Card from './Card.jsx'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <div className="card-grid">
          {this.props.ads.map(a => <Card />)}
        </div>
      </div>
    )
  }
}