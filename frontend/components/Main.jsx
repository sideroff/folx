import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./Home.jsx"
import Authentication from './Authentication.jsx'
import Profile from "./Profile.jsx"
import AdCreate from "./AdCreate.jsx"
import NotFound from "./NotFound.jsx"
import RequireAuth from './RequireAuth.jsx'


export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='main-content'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={RequireAuth(Profile, '/profile')} />
          <Route exact path="/ad-create" component={RequireAuth(AdCreate, '/ad-create')} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/register" component={Authentication} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}