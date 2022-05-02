import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.js'

// make this variable false for remote
const useLocal = false;
export const restUrl = useLocal ? "http://localhost:5000/" : "https://convo-may.herokuapp.com/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
