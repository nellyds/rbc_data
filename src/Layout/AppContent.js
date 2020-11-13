import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PoliceShootings from "../Pages/PoliceShootings"
import USCovid from "../Pages/USCovid"
import About from "../Pages/About"
import Projects from "../Pages/Projects"
import {CenterDiv} from "../Styles/StyledComponents"
function AppContent(){
    return(
      <CenterDiv>
    <Switch>
      <Route path="/visualizations" component={Projects} exact />
      <Route path="/covid" component={USCovid} />
      <Route path="/about" component={About} />
      <Route path="/police" component={PoliceShootings} />
  </Switch>
  </CenterDiv>
    )
}

export default AppContent;