import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PoliceShootings from "../Pages/PoliceShootings"
import USCovid from "../Pages/USCovid"
function AppContent(){
    return(
    <Switch>
      <Route path="/" component={PoliceShootings} exact />
      <Route path="/covid" component={USCovid} />
  </Switch>
    )
}

export default AppContent;