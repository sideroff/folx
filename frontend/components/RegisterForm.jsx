import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Form from './Form.jsx'
import { register as registerFormConfig } from './../forms'
import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    registerForm: state.forms.register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFormChange: (name, value) => {
      dispatch({ type: actionTypes.REGISTER_FORM_FIELD_CHANGE, payload: { name, value } })
    }
  }
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit() {
    event.preventDefault()
    console.log('register submit')

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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)