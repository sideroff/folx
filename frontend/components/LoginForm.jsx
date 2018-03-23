import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Form from './Form.jsx'
import { login as loginFormConfig } from './../forms'
import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'

function mapStateToProps(state) {
  return {
    loginForm: state.forms.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFormChange: (name, value) => {
      dispatch({ type: actionTypes.LOGIN_FORM_FIELD_CHANGE, payload: { name, value } })
    },
    loginUser: (params) => {
      dispatch({ type: actionTypes.LOGIN_REQUEST, payload: params })
      requestDispatcher.requestToServer('users.login', params).then(response => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response })
        // TODO: redirect to previously requested page, try withRouter
      }).catch(error => {
        dispatch({ type: actionTypes.LOGIN_FAILURE, params: error })
      })

    }
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit(event) {
    event.preventDefault()

    // TODO: do validity checks

    this.props.loginUser(this.props.loginForm)
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