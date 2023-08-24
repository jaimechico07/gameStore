import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cart/:gameId',
    element: <Cart />,
  },
]);
