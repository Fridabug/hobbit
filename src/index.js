import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import {SocketProvider} from './context/SocketProvider'
import { UserProvider } from './context/user.context'
import { ContextProvider } from './context/contextProvider';
import { ChatProvider } from './context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <SocketProvider>
        <ChatProvider>
            <ContextProvider>
              <App />
            </ContextProvider>
          </ChatProvider>
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
