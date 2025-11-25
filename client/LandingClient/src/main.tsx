import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App'
import ModalContextProvider from './context/ModalContext';


const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>

    </QueryClientProvider>
  </StrictMode>,
)
