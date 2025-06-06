import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import {Provider} from 'react-redux'
import Store from './app/Store.jsx'





createRoot(document.getElementById('root')).render(
  <div>
    <Provider store={Store}>
      
          <App />
      
    <ToastContainer />
    </Provider>
  </div>  
)
