import React from 'react';

import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>

      <Outlet/>
    </>
  );
}

export default App;
