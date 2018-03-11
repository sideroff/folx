import React from 'react'
import actionTypes from './../actionTypes'
import { connect } from 'react-redux'

import requestDispatcher from './../services/requestDispatcher'

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (params) => {
      dispatch({ type: actionTypes.LOGIN_REQUEST, payload: params })

      requestDispatcher.requestToServer('users.login', params).then(result => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: result })
      }).catch(error => {
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error })
      })
    }
  }
}

class TestPage extends React.Component {
  constructor(props) {
    super(props)

    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onButtonClick() {
    console.log('here')
    this.props.login({ username: "test", password: "test2" })
  }

  render() {
    return (
      <div>
        <h1>test</h1>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
        <button onClick={this.onButtonClick}>test ajax</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage)