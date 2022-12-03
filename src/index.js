import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './app.js';


// make this variable false for remote
const useLocal = false;
export const restUrl = useLocal ? "http://localhost:5000/" : "https://conversation-agent.herokuapp.com/";
export const deepStreamUrl = useLocal ? "localhost:6020" : "wss://conversation-agent-deepstream.herokuapp.com";

const container = document.getElementById('root');
const root = createRoot(container);


root.render( <BrowserRouter><App/></BrowserRouter> );
