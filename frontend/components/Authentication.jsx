import React from 'react'
import { connect } from 'react-redux'

import Form from './Form.jsx'
import forms from './../forms'

import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAuthenticationForm: (formName) {
      dispatch({ type: actionTypes.TOGGLE_AUTHENTICATION_FORM, payload: formName })
    }
  }
}

class Authentication extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <Form config={forms.login} />
          <Form config={forms.register} />
        </div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Authentication)