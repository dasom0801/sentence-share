import { createBrowserRouter } from 'react-router-dom';
import { ProfileRoutes } from '../modules/Profile';
import App from '../App';
import { AuthGuard } from '../components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        async lazy() {
          const { AuthGuard } = await import('../components');
          return { Component: AuthGuard };
        },
        element: <AuthGuard />,
        children: [...ProfileRoutes],
      },
    ],
  },
]);

export default router;
