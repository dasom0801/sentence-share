import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '@/components';
import { BookDetailPage } from '@/feature/book-detail';
import { MainPage } from '@/feature/main';

import App from '../App';
import userMenuRoute from './user-menu.route';
import editRoute from './edit.route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <MainPage /> },
      {
        path: '/book/:id',
        element: <BookDetailPage />,
      },
      {
        // 로그인해야지만 이용할 수 있는 페이지들
        async lazy() {
          const { AuthGuard } = await import('../components');
          return { Component: AuthGuard };
        },
        children: [userMenuRoute, editRoute],
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]);

export default router;
