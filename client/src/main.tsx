import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (favicon) {
  favicon.href = `${import.meta.env.VITE_S3_URL}/logo.png`;
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
