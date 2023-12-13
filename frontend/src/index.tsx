import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min'
import './index.css';
import { TokenContextProvider } from './Context/tokenContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
