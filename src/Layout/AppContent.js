import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from "../Pages/About"
import {VisualizerContainer } from "../Contexts/VisualizerContext"
import Projects from "../Pages/Projects"
import {CenterDiv} from "../Styles/StyledComponents"
import {GameContextContainer} from "../Contexts/GameContext"
import {CovidContextContainer} from "../Contexts/CovidContext"
import {DataContextContainer} from "../Contexts/DataContext"
import {HomicideContainer} from "../Contexts/HomicideContext";
import {CFPContainer} from "../Contexts/CFPContext"
import Kwh from "../Pages/kwh"
import Transit from "../Pages/Transit"
function AppContent(){
    return(
      <CenterDiv>
    <Switch>
      <Route path="/visualizations" component={Projects} exact />
      <Route path="/covid" component={CovidContextContainer} />
      <Route path="/about" component={About} />
      <Route path="/police" component={DataContextContainer} />
      <Route path="/gameSales" component ={GameContextContainer} />
      <Route path="/homicides" component= {HomicideContainer} />
      <Route path="/cfp" component={CFPContainer} />
      <Route path="/" component={Projects} exact />
      <Route path="/transit" component = {Transit} />
      <Route path="/kwh" component={Kwh} />
  </Switch>
  </CenterDiv>
    )
}

export default AppContent;