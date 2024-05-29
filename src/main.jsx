import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { UIProvider } from './contexts/UIContext.jsx'
import { TodoProvider } from './contexts/TodoContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import './assets/fonts/Roboto-Regular.ttf';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <UIProvider>
          <NotificationProvider>
            <TodoProvider>
              <App />
            </TodoProvider>
          </NotificationProvider>
        </UIProvider>
      </AuthProvider>
  </React.StrictMode>,
)
