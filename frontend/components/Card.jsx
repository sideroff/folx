import React from 'react'
import { Link } from 'react-router-dom'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='card'>
        {this.props.isCardLoading && <div className='card-overlay'>
          <div className='loading-card-background' >
            <div className='loading-card-background-seamless' >
              <div className='loading-spinner-outer'>
                <div className='loading-spinner-inner' />
              </div>
            </div>
          </div>
        </div>}
        {!this.props.isCardLoading && <div>
          <img src="https://picsum.photos/9/5/?random" alt="card-image" />
          <div className="card-main-info">
            <div className="card-price"><strong>${this.props.values.price}</strong></div>
            <div className="card-title">
              <strong>
                <Link to={`/ad/${this.props.values._id}`}>{this.props.values.title}</Link>
              </strong>
            </div>
          </div>
          <div className="card-description">{this.props.values.description}</div>
          <div className="card-share-options"></div>
        </div>}

      </div>
    )
  }
}