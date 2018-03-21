import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Form from './Form.jsx'
import forms from './../forms'

import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAuthenticationForm: (formName) => {
      dispatch({ type: actionTypes.TOGGLE_AUTHENTICATION_FORM, payload: formName })
    }
  }
}

class Authentication extends React.Component {
  constructor(props) {
    super(props)
  }
  onLoginChange(event) {
    event.preventDefault()
    console.log('event ' + event.target.name + ' ' + event.target.value)
  }
  onLoginSubmit() {

  }
  onRegisterChange() {

  }
  onRegisterSubmit() {

  }

  render() {
    return (
      <div>
        <div>
          <div className="form-wrapper centered">
            <div></div>
            <Form config={forms.login} onChange={this.onLoginChange} onSubmit={this.onLoginSubmit} />
            <div></div>
          </div>
          <div className="form-wrapper centered">
            <div></div>
            <Form config={forms.register} onChange={this.onRegisterChange} onSubmit={this.onRegisterSubmit} />
            <div></div>
          </div>
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