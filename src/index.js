import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/user.context';
<<<<<<< HEAD
import { ContextProvider } from './context/contextProvider';
=======
>>>>>>> main

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
