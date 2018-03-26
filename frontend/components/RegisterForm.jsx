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


class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.dispatch({ type: actionTypes.REGISTER_REQUEST, payload: this.props.registerForm })

    requestDispatcher.requestToServer('users.register', this.props.registerForm).then(result => {
      this.props.dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: result })
      this.props.history.push('/')
    }).catch(error => {
      this.props.dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error })
    })
  }

  onChange(event) {
    this.props.dispatch(
      {
        type: actionTypes.REGISTER_FORM_FIELD_CHANGE,
        payload: {
          name: event.target.name,
          value: event.target.value
        }
      }
    )
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

export default withRouter(connect(mapStateToProps, (dispatch) => { return { dispatch } })(RegisterForm))