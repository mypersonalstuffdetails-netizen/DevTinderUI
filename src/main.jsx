import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> //Commented here to avoid 2 making calls in devmode
    <App />
  // </StrictMode>,
)
