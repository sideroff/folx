import React from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'

import RegisterForm from './RegisterForm.jsx'
import LoginForm from './LoginForm.jsx'

import forms from './../forms'
import actionTypes from './../actionTypes'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="authentication">
          <div className="authentication-side-picture"><img src="https://picsum.photos/300/300/?random" alt="" /></div>

          <div>
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginForm} />
          </div>
        </div>
      </div>
    )
  }
}

export default Authentication