import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
  };
  return (
    <div className="App">
      <header className="App-header">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
      </header>
    </div>
  );
}

export default App;
