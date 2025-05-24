import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'
import './index.css'

// Registrasi service worker untuk PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Pembaruan tersedia. Muat ulang aplikasi?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('Aplikasi siap digunakan secara offline.')
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
