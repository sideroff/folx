import React from 'react'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    console.log(`card ${JSON.stringify(this.props)}`)
  }

  render() {
    return (
      <div className='card'>
        <img src="https://picsum.photos/300/300/?random" alt="card-image" />
        <div className="card-main-info">
          <div className="card-price">$420</div>
          <div className="card-name">Lorem ipsum something name</div>
        </div>
        <div className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        <div className="card-share-options"></div>
      </div>
    )
  }
}