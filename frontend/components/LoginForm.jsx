import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Form from './Form.jsx'
import { login as loginFormConfig } from './../forms'
import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    loginForm: state.forms.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFormChange: (name, value) => {
      dispatch({ type: actionTypes.LOGIN_FORM_FIELD_CHANGE, payload: { name, value } })
    }
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit() {
    event.preventDefault()
    console.log('login submit')

  }

  onChange(event) {
    event.preventDefault()
    this.props.dispatchFormChange(event.target.name, event.target.value)
  }

  render() {
    return (
      <div>
        <Form config={loginFormConfig} formValues={this.props.loginForm} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} />
        <div>
          <span>Not registered?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)