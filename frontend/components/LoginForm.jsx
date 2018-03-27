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

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit(event) {
    event.preventDefault()

    // TODO: do validity checks

    this.props.dispatch({ type: actionTypes.LOGIN_REQUEST, payload: this.props.loginForm })

    requestDispatcher.requestToServer('users.login', this.props.loginForm).then(response => {
      this.props.dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response })
      this.props.history.push(this.props.onAuthRedirect)
    }).catch(error => {
      this.props.dispatch({ type: actionTypes.LOGIN_FAILURE, params: error })
    })
  }

  onChange(event) {
    this.props.dispatch(
      {
        type: actionTypes.LOGIN_FORM_FIELD_CHANGE,
        payload: {
          name: event.target.name,
          value: event.target.value
        }
      })
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

export default withRouter(connect(mapStateToProps, (dispatch) => { return { dispatch } })(LoginForm))