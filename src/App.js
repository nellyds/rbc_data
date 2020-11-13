import React from 'react';
import './Styles/app.css';
import DataContext from "./Contexts/DataContext"
import CovidContext from "./Contexts/CovidContext"
import AppLayout from "./Layout/AppLayout"


export default function App() {

  return (
    <DataContext>
      <CovidContext>
    <AppLayout />
    </CovidContext>
    </DataContext>
  );
}