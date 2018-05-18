import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import "./styles/index.scss"

import App from './components/App.jsx'
import store from './store'
import actionTypes from './actionTypes'


if (!localStorage.getItem('didAcknowledgePersonalInformationWarning')) {
  store.dispatch(
    {
      type: actionTypes.ADD_MESSAGE,
      payload: {
        messageIndex: 'general',
        messageType: 'personalInformationWarning',
        message: 'This application is for demo purposes only. Please DO NOT use personal information (emails, passwords etc.).'
      }
    })
}

window.onload = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("app"))
}