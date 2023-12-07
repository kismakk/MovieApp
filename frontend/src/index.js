//Entry point of the frontend

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; //importing the App component from App.js
import reportWebVitals from './reportWebVitals';
import { LoginProvider } from './components/contexts/LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
