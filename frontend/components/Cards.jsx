import React from 'react'

import Card from './Card.jsx'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card-grid">
        {this.props.areCardsLoading
          ? Array.apply(null, Array(this.props.ads)).map(i => <Card key={i} isCardLoading={true} eb={i} />)
          : this.props.ads.map((a, i) => <Card key={a._id} values={a} eb={i} />)}
        {}
      </div>
    )
  }
}