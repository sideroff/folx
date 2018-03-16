import React from 'react'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div key={this.props.key} className='card'>ayy card</div>
    )
  }
}