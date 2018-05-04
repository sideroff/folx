import React from 'react'

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
            <div className="card-price"><strong>$420</strong></div>
            <div className="card-title"><strong>title</strong></div>
          </div>
          <div className="card-description">description</div>
          <div className="card-share-options"></div>
        </div>}

      </div>
    )
  }
}




// import React from 'react'

// export default class Card extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <div className='card'>
//         {this.props.isCardLoading && <div className='card-overlay'></div>}
//         {!this.props.isCardLoading && <div>
//           <img src="https://picsum.photos/900/500/?random" alt="card-image" />
//           <div className="card-main-info">
//             <div className="card-price"><strong>${this.props.values.price}</strong></div>
//             <div className="card-title"><strong>{this.props.values.title}</strong></div>
//           </div>
//           <div className="card-description">{this.props.values.description}</div>
//           <div className="card-share-options"></div>
//         </div>}

//       </div>
//     )
//   }
// }