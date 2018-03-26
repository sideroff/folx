import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import Form from './Form.jsx'
import { register as registerFormConfig } from './../forms'
import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'

function mapStateToProps(state) {
  return {
    registerForm: state.forms.register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFormChange: (name, value) => {
      dispatch({ type: actionTypes.REGISTER_FORM_FIELD_CHANGE, payload: { name, value } })
    },
    registerUser: user => {
      return new Promise((resolve, reject) => {
        dispatch({ type: actionTypes.REGISTER_REQUEST, payload: user })

        requestDispatcher.requestToServer('users.register', user).then(result => {
          dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: result })
          resolve(result)
        }).catch(error => {
          dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error })
          reject()
        })
      })
    }
  }
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.registerUser(this.props.registerForm).then(result => {
      this.props.history.push('/')
    }).catch(error => {
      // nothing, the error has been dispatched already
    })
  }

  onChange(event) {
    event.preventDefault()
    this.props.dispatchFormChange(event.target.name, event.target.value)
  }

  render() {
    return (
      <div>
        <Form
          config={registerFormConfig}
          formValues={this.props.registerForm}
          onChange={this.onChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)} />
        <div>
          <span>Already registered?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))