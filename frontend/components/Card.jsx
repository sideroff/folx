import React from 'react'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    console.log(JSON.stringify(this.props))
  }

  render() {
    return (
      <div className='card'>
        {this.props.isCardLoading && <div className='card-overlay'></div>}
        {!this.props.isCardLoading && <div>
          <img src="https://picsum.photos/300/300/?random" alt="card-image" />
          <div className="card-main-info">
            <div className="card-price"><strong>${this.props.values.price}</strong></div>
            <div className="card-title"><strong>{this.props.values.title}</strong></div>
          </div>
          <div className="card-description">{this.props.values.description}</div>
          <div className="card-share-options"></div>
        </div>}

      </div>
    )
  }
}