import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'

import "./styles/index.scss"

window.onload = () => {  
  ReactDOM.render(
    <App />,
    document.getElementById("app"))
}