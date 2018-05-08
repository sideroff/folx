import React from 'react'
import { connect } from 'react-redux'

import SearchForm from './SearchForm.jsx'
import Cards from './Cards.jsx'

import requestDispatcher from './../services/requestDispatcher'
import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    adGetSkip: state.flags.adGetSkip,
    adGetLimit: state.flags.adGetLimit,
    numberOfLoadingAds: state.flags.numberOfLoadingAds,
    ads: state.ads
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch({ type: actionTypes.FETCHING_ADS, payload: this.props.adGetLimit })
    requestDispatcher.requestToServer('ads.get', { limit: this.props.cardGetLimit, skip: this.props.cardGetSkip }).then(results => {
      this.props.dispatch({ type: actionTypes.ADD_ADS, payload: results || [] })
    }).catch(error => {
      this.props.dispatch({ type: actionTypes.ADD_MESSAGE, payload: error })
    })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: actionTypes.REMOVE_ADS })
  }

  render() {
    return (
      <div>
        <SearchForm />
        <Cards cardsValues={this.props.ads} numberOfLoading={this.props.numberOfLoadingAds} />
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatch => { return { dispatch } })(Home)