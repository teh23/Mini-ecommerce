import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'axios'
import axios from 'axios';

function App() {

  const [data, setState] = useState('')

  useEffect(() => {
    console.log('test')
    axios.get('/api')
      .then(res => setState(res.data))

  }, [])
  if (!data) return <>Loading...</>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data}
        </a>
      </header>
    </div>
  );
}

export default App;
