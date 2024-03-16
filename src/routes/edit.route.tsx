import { RouteObject } from 'react-router-dom';

const editRoute: RouteObject = {
  path: '/edit',
  children: [
    {
      path: '/edit/sentence',
      async lazy() {
        const { SentenceEditPage } = await import('@/feature/sentence-edit');
        return { Component: SentenceEditPage };
      },
    },
    {
      path: '/edit/sentence/:id',
      async lazy() {
        const { SentenceEditPage } = await import('@/feature/sentence-edit');
        return { Component: SentenceEditPage };
      },
    },
  ],
};

export default editRoute;
