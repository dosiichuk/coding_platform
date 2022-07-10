import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

import './App.css';

function App() {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    setCode(result.outputFiles[0].text);
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
