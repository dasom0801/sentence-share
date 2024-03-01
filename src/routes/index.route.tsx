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
              const { SettingPage } = await import('../pages');
              return { Component: SettingPage };
            },
          },
          {
            path: '/my/sentence',
          },
          {
            path: '/my/like',
          },
        ],
      },
    ],
  },
]);

export default router;
