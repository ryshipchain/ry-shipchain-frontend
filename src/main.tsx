import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StyledEngineProvider injectFirst>
      <App />
      <ToastContainer />
    </StyledEngineProvider>
  </StrictMode>,
)
