import React from 'react'

import Card from './Card.jsx'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card-grid">
        {[...this.props.cardsValues.map((a, i) =>
          <Card key={a._id} values={a} />),
        ...Array.apply(null, Array(this.props.numberOfLoading)).map((v, i) =>
          <Card key={'L' + i} isCardLoading={true} />)]}
      </div>
    )
  }
}