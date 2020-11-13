import React from 'react';
import './Styles/app.css';
import DataContext from "./Contexts/DataContext"
import CovidContext from "./Contexts/CovidContext"
import AppLayout from "./Layout/AppLayout"
import GameContext from "./Contexts/GameContext"

export default function App() {

  return (
    <GameContext>
    <DataContext>
      <CovidContext>
    <AppLayout />
    </CovidContext>
    </DataContext>
    </GameContext>
  );
}