import { RouteObject } from 'react-router-dom';

const editRoute: RouteObject = {
  path: '/edit',
  children: [
    {
      path: '/edit/sentence',
      async lazy() {
        const { SentenceEditPage } = await import('../pages');
        return { Component: SentenceEditPage };
      },
    },
    {
      path: '/edit/sentence/:id',
      async lazy() {
        const { SentenceEditPage } = await import('../pages');
        return { Component: SentenceEditPage };
      },
    },
  ],
};

export default editRoute;
