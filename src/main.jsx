import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4'
import App from './App.impl.jsx'
import './styles.css'

ReactGA.initialize('G-0BSED2QSBR')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)