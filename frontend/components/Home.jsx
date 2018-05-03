import React from 'react'
import { connect } from 'react-redux'

import SearchForm from './SearchForm.jsx'
import Cards from './Cards.jsx'

import requestDispatcher from './../services/requestDispatcher'
import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    adGetSkip: state.flags.adGetSkip,
    adGetLimit: state.flags.adGetLimit
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    requestDispatcher.requestToServer('ads.get', { limit: this.props.cardGetLimit, skip: this.props.cardGetSkip }).then(results => {
      this.props.dispatch({ type: actionTypes.ADD_ADS, payload: results || [] })
    }).catch(error => {
      this.props.dispatch({ type: actionTypes.ADD_MESSAGE, payload: error })
    })
  }

  render() {
    return (
      <div>
        <SearchForm />
        <div></div>
        <Cards ads={this.props.getLimitSize} areCardsLoading={true} />
        <Cards ads={[{ title: 'title1', description: 'description1', price: 420 }]} />
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatch => { return { dispatch } })(Home)