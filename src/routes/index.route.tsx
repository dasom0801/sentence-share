import { createBrowserRouter } from 'react-router-dom';
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
        children: [
          {
            path: '/setting',
            async lazy() {
              const { Setting } = await import('../pages');
              return { Component: Setting };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
