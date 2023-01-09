import React from 'react';
import App from './App.js';
import reactDOM from 'react-dom';
import MainContextProvider from './context/MainContextProvider.js';
import { HashRouter } from 'react-router-dom';

reactDOM.render(
  <HashRouter>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </HashRouter>,
  document.getElementById('root')
);
