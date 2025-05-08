import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
import  store from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="679101494818-h9kd80um4f0hiq8dpvrp83stacqv2kj6.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
