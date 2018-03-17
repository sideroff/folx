import React from 'react'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='card'>
        <img src="https://picsum.photos/300/300/?random" alt="card-image" />
        <div className="card-main-info">
          <div className="card-price"><strong>$420</strong></div>
          <div className="card-name"><strong>Lorem ipsum something name</strong></div>
        </div>
        <div className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        <div className="card-share-options"></div>
      </div>
    )
  }
}