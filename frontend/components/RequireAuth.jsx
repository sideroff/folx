import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function mapStateToProps(state) {
  return {
    currentUser: state.users.current
  }
}

export default function (Component) {

  class Authenticate extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      // TODO: add popup message stating that to access the page the user needs to be logged in
    }

    render() {
      return (
        this.props.currentUser
          ? <Component {...this.props} />
          : <Redirect to='/login' />
      )
    }
  }

  return connect(mapStateToProps)(Authenticate)
}