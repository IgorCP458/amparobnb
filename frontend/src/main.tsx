import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.documentElement.classList.add('dark'); // Ativa modo dark fixo (temporário)

createRoot(document.getElementById('root')!).render(
  <App />
)
