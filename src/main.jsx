import studio from '@theatre/studio'
import  extensions  from '@theatre/r3f/dist/extension'
import React, {Suspense}from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

studio.extend(extensions)
studio.initialize()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Suspense fallback={null}>
    <App />
    </Suspense>
  </React.StrictMode>,
)
