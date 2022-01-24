import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserInterface from './UserInterface';
ReactDOM.render(
  <React.StrictMode>
    <App/>
    <UserInterface />
  </React.StrictMode>,
  document.getElementById('root')
);
