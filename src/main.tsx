import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import queryClient from './services/queryClient.tsx';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
