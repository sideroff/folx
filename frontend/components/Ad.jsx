import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'
import { cachedAdsLifetime } from './../config'

function mapStateToProps(state) {
  return {
    currentAd: state.currentAd,
  }
}

class Ad extends React.Component {
  constructor(props) {
    super(props)

    this.adId = this.props.match.params.id
  }

  componentWillMount() {
    this.props.dispatch({ type: actionTypes.GET_ADD_BY_ID_REQUEST, payload: this.adId })
    requestDispatcher.requestToServer('ads.getById', { id: this.adId }).then(result => {
      this.props.dispatch({ type: actionTypes.GET_ADD_BY_ID_RESPONSE, payload: result })
    }).catch(error => {
      this.props.dispatch({ type: actionTypes.GET_ADD_BY_ID_FAILURE, payload: error })
    })
  }

  render() {
    return (
      <div>
        {this.props.currentAd &&
          <div>
            <h2>Ad</h2>
            <div>Title: {this.props.currentAd.title}</div>
            <div>Description: {this.props.currentAd.description}</div>
            <div>Price: ${this.props.currentAd.price}</div>
            <div>Created on: {moment(this.props.currentAd.createdOn).format()}</div>
          </div>}
        {!this.props.currentAd && <div>ad does not exists</div>}
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatch => { return { dispatch } })(Ad)