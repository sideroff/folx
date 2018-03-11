import React from 'react'
import { Switch, Route } from 'react-router-dom'

import TestPage from './testPage.jsx'
import TestPage2 from './testPage2.jsx'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

      <main>
        <h1>main</h1>
        <Switch >
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/test2" component={TestPage2} />
        </Switch>
      </main>
    )
  }
}