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
    onAuthRedirect: state.flags.onAuthRedirect,
    failureMessage: state.messages[actionTypes.LOGIN_FAILURE]
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
      this.props.dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error })
    })
  }

  onChange(event) {
    this.props.dispatch(
      {
        type: actionTypes.FORM_FIELD_CHANGE,
        payload: {
          form: loginFormConfig.name,
          field: {
            name: event.target.name,
            value: event.target.value
          }
        }
      })
  }

  dismissMessage() {
    this.props.dispatch({ type: actionTypes.DISMISS_MESSAGE, payload: actionTypes.LOGIN_FAILURE })
  }

  render() {
    return (
      <div>
        <Form
          config={loginFormConfig}
          formValues={this.props.loginForm}
          onChange={this.onChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          failureMessage={this.props.failureMessage}
          dismissMessage={this.dismissMessage.bind(this)}
        />
        <div>
          <span>Not registered?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, (dispatch) => { return { dispatch } })(LoginForm))