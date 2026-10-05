import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LandProvider } from './context/LandContext.jsx'
import './i18n';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <LandProvider>
          <App />
        </LandProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
)
