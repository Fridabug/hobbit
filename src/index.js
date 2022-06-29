import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/user.context';
import { SidebarProvider } from './context/sidebar.context';
import { ContextProvider } from './context/contextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SidebarProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </SidebarProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
