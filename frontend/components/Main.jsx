import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./Home.jsx"
import Authentication from './Authentication.jsx'
import Profile from "./Profile.jsx"
import AdCreate from "./AdCreate.jsx"
import Ad from "./Ad.jsx"
import NotFound from "./NotFound.jsx"
import RequireAuth from './RequireAuth.jsx'
import About from './About.jsx'


export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={RequireAuth(Profile, '/profile')} />
          <Route exact path="/ad-create" component={RequireAuth(AdCreate, '/ad-create')} />
          <Route exact path="/ad/:id" component={Ad} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/register" component={Authentication} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
    )
  }
}