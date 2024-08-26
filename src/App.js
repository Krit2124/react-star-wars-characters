import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import Header from './components/header';
import { useGeneralStore } from 'store/store';
import CharacterDetails from 'components/characterDetails';

function App() {
  const { 
    isDetailsOpen,
} = useGeneralStore();

  return (
    <>
      {/* Отображение карточки с детальной информацией о персонаже */}
      {isDetailsOpen && <CharacterDetails />}
      
      <header>
        <Header />
      </header>

      <Outlet/>
    </>
  );
}

export default App;
