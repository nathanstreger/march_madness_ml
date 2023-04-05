import React from 'react';
import logo from './logo.svg';
import './App.css';
import { apiGet } from './WebRequestBank/FetchWrapper';
import { Endpoints } from './WebRequestBank/Constants';

interface StandardMessage {
  message: string
}

function App() {
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
          Learn React
        </a>
        <button onClick={SayHelloInAnAlert}>
          Test Hello World Endpoint
        </button>
      </header>
    </div>
  );
}

const SayHelloInAnAlert = async () => {
  const response: StandardMessage = await apiGet<StandardMessage>(Endpoints.HelloWorld)
  alert(response.message)
}

export default App;
