import React from 'react'

import Form from './Form.jsx'
import forms from './../forms'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Form config={forms.login} />
        <Form config={forms.register} />
      </div>
    )
  }
}