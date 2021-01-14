import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"
import ShowsList from "./ShowsList"
import NewShowForm from "./NewShowForm"
import ShowDetail from "./ShowDetail"

const App = props => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ShowsList} />
        <Route exact path="/shows" component={ShowsList} />
        <Route exact path="/shows/new" component={NewShowForm} />
        <Route exact path="/shows/:id" component={ShowDetail} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)