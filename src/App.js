import React from 'react';
import logo from './logo.svg';
import './App.css';
import Crypto from './Crypto'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
  
      </header>
      <Crypto />
    </div>
  );
}

export default App;
