import React from 'react'

import Form from './Form.jsx'
import { login as loginFormConfig } from './../forms'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit() {
    event.preventDefault()
    console.log('login submit')

  }

  onChange(event) {
    event.preventDefault()
    console.log('login change')
  }

  render() {
    return (
      <div>
        <Form config={loginFormConfig} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}