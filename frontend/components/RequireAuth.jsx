import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeOnAuthRedirect: (redirectUrl) => {
      dispatch({ type: actionTypes.CHANGE_ON_AUTH_REDIRECT, payload: redirectUrl })
    }
  }
}

// TODO: this setup wont allow parent component to pass properties to child component
export default function (Component, redirectUrl = '/') {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      if (!this.props.currentUser.isLoggedIn) {
        this.props.changeOnAuthRedirect(redirectUrl)
      }
      // TODO: add popup message stating that to access the page the user needs to be logged in
    }

    render() {
      return (
        this.props.currentUser.isLoggedIn
          ? <Component {...this.props} />
          : <Redirect to={'/login'} />
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate)
}