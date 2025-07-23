import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import './fontawesome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (favicon) {
  favicon.href = `${import.meta.env.VITE_S3_URL}/logo.png`;
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
