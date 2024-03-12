import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import userMenuRoute from './user-menu.route';
import editSentenceRoute from './edit-sentence.route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // 로그인해야지만 이용할 수 있는 페이지들
        async lazy() {
          const { AuthGuard } = await import('../components');
          return { Component: AuthGuard };
        },
        children: [userMenuRoute, editSentenceRoute],
      },
    ],
  },
]);

export default router;
