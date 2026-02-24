import { createBrowserRouter } from 'react-router-dom';
import Root from './component/Root.jsx';
import Home from './component/Home.jsx';
import Shop from './component/Shop.jsx';
import { ShoppingCart } from './component/ShoppingCart';

import './css/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/shopping-cart-pokemon/',
        element: <Home />,
      },
      {
        path: '/shopping-cart-pokemon/home',
        element: <Home />,
      },
      {
        path: '/shopping-cart-pokemon/shop',
        element: <Shop />,
      },
      {
        path: '/shopping-cart-pokemon/cart',
        element: <ShoppingCart />,
      },
    ],
  },
]);

export default router;
