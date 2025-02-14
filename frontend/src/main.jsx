import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/User/login'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
