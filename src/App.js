import logo from './logo.svg';
import './Styles/app.css';
import DataContext from "./Contexts/DataContext"
import ShootingsMap from "./Components/ShootingsMap"
import PoliceShootings from "./Pages/PoliceShootings"
import USCovid from "./Pages/USCovid"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
        <DataContext>
          <Route path="/" component={PoliceShootings} exact />
          <Route path="/covid" component={USCovid} />
        </DataContext>
      </Switch>
    </div>
  );
}

export default App;
