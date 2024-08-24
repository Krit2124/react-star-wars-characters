import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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
