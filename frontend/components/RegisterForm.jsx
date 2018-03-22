import React from 'react'

import Form from './Form.jsx'
import { register as registerFormConfig } from './../forms'

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit() {
    event.preventDefault()
    console.log('register submit')

  }

  onChange(event) {
    event.preventDefault()
    console.log('register submit')
  }

  render() {
    return (
      <div>
        <Form config={registerFormConfig} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}