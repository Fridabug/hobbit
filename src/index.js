import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import {SocketProvider} from './context/SocketProvider'
import { UserProvider } from './context/user.context'
import {ContactsProvider} from './context/ContactsProvider';
import {ConversationsProvider} from './context/ConversationsProvider'
import { ContextProvider } from './context/contextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <SocketProvider>
          <ContactsProvider>
            <ConversationsProvider>
              <ContextProvider>
              <App />
              </ContextProvider>
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
