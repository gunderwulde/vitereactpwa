import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import MainRoutes from './Routes';

if ('serviceWorker' in navigator) {
    registerSW({
        immediate: true,
        onNeedRefresh() {
      console.log('Nueva version disponible, por favor recarga la pagina.')
        },
        onOfflineReady() {
      console.log('Aplicacion lista para trabajar sin conexion.')
        }
    })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainRoutes />
  </StrictMode>,
)
