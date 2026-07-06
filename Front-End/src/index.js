import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SessionProvider } from './components/SessionContext/sessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SessionProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </SessionProvider>
);

