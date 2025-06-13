import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Store, { persistor } from './Redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <div>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
    <ToastContainer />
    </Provider>
  </div>  
)
