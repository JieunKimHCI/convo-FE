import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.js'

// make this variable false for remote
const useLocal = false;
export const restUrl = useLocal ? "http://localhost:5000/" : "https://convo-may.herokuapp.com/";
export const deepStreamUrl = useLocal ? "localhost:6020" : "wss://desolate-spire-52971.herokuapp.com:6020";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
