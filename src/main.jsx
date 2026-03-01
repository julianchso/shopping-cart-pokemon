import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './App.jsx';
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShoppingCartProvider } from './context/ShoppingCartContext.jsx';
// import { SearchBarProvider } from './context/SearchbarContext.jsx';

import './css/reset.css';
import './css/global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
        <div className='layout'>
          <RouterProvider router={router} />
        </div>
      </ShoppingCartProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
