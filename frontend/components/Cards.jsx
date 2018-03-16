import React from 'react'

import Card from './Card.jsx'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
    console.log(`cards - ${JSON.stringify(this.props)}`)
  }

  render() {
    return (
      <div className="card-grid">
        {this.props.ads.map((a, i) => <Card key={i} />)}
      </div>
    )
  }
}