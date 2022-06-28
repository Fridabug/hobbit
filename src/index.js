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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SocketProvider>
      <UserProvider>
        <ContactsProvider>
        <ConversationsProvider>
          <App />
        </ConversationsProvider>
        </ContactsProvider>
      </UserProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);