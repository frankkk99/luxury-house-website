import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './ui-editor.css'
import './flow-redesign.css'
import './glass-topbar.css'
import './mobile-ui-editor.css'
import './mobile-luxury-home.css'
import './mobile-ui-editor.js'
import './force-mobile-compact.js'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
