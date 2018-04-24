
import React from 'react'
import { connect } from 'react-redux'

import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'
import { cachedAdsLifetime } from './../config'

function mapStateToProps(state) {
  return {
    ads: state.ads,
  }
}

class Ad extends React.Component {
  constructor(props) {
    super(props)

    this.adId = this.props.match.params.id
  }

  componentWillMount() {
    console.log('component will mount')
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let ad = this.props.ads[this.adId]

      if (!ad || ad.loadedTimestamp + cachedAdsLifetime < Date.now()) {

        requestDispatcher.requestToServer('ads.getById', { id: this.adId }).then(result => {
          this.props.dispatch({ type: actionTypes.UPDATE_CACHED_AD, payload: result })
        }).catch(error => {
          let updateValue = { id: this.adId, value: null }

          if (error.code === 'adDoesNotExist') {
            updateValue.doesNotExist = true
          }

          this.props.dispatch({ type: actionTypes.UPDATE_CACHED_AD, payload: updateValue })
        })
      }
    }
  }

  render() {
    console.log('render ', JSON.stringify(this.props))
    return (
      <div>
        {this.props.ads[this.adId] && this.props.ads[this.adId].doesNotExist && <div>ad does not exists</div>}
        {this.props.ads[this.adId] && !this.props.ads[this.adId].doesNotExist && <div>{'ad does exist' + JSON.stringify(this.props.ads[this.adId])}</div>}
        {!this.props.ads[this.adId] && <div>loading</div>}
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatch => { return { dispatch } })(Ad)