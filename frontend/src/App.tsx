import React, { useState } from 'react';
import { hc } from 'hono/client';
import type { Api } from '../../server';
import './App.css';

const client = hc<Api>("/");

function App() {
  const [response, setResponse] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

  async function get() {
    // @ts-ignore
    const res = await client.api.$get();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    setResponse(JSON.stringify(data.message, null, 2));
    return data.message;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const res = await client.api.echo.$post({
        json: { message: inputText }
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while fetching data');
    }
  };

  return (
    <div>
      <h1>Echo Test</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to echo"
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={get}>Get Data</button>
      <pre>{response}</pre>
    </div>
  );
}

export default App;