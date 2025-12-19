import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 5,
      gcTime: 1000 * 60 * 15
    }

  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <ToastContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ToastContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
