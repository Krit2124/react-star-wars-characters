import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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
      {isDetailsOpen && <CharacterDetails />}
      
      <header>
        <Header />
      </header>

      <Outlet/>
    </>
  );
}

export default App;
