import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import Form from './Form.jsx'
import { login as loginFormConfig } from './../forms'
import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'

function mapStateToProps(state) {
  return {
    loginForm: state.forms.login,
    onAuthRedirect: state.flags.onAuthRedirect
  }
}

function mapDispatchToProps(dispatch) {
  // having
  // return { dispatch }
  // will eliminate some of the govno kod here
  return {
    dispatchFormChange: (name, value) => {
      dispatch({ type: actionTypes.LOGIN_FORM_FIELD_CHANGE, payload: { name, value } })
    },
    loginUser: (params, onAuthRedirect) => {
      dispatch({ type: actionTypes.LOGIN_REQUEST, payload: params })
      return new Promise((resolve, reject) => {
        requestDispatcher.requestToServer('users.login', params).then(response => {
          dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response })
          resolve()
        }).catch(error => {
          dispatch({ type: actionTypes.LOGIN_FAILURE, params: error })
          reject(error)
        })
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
    console.dir(this.props)
    this.props.loginUser(this.props.loginForm, this.props.onAuthRedirect).then(() => {
      this.props.history.push(this.props.onAuthRedirect)
    }).catch(error => {
      // nothing, action has already been dispatched
    })
  }

  onChange(event) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))