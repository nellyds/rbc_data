import React from 'react';
import './Styles/app.css';
import DataContext from "./Contexts/DataContext"
import PoliceShootings from "./Pages/PoliceShootings"
import USCovid from "./Pages/USCovid"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppLayout from "./Layout/AppLayout"


export default function App() {

  return (
    <DataContext>
    <AppLayout />
    </DataContext>
  );
}