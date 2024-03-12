import { RouteObject } from 'react-router-dom';

const userMenuRoute: RouteObject = {
  path: '/my',
  children: [
    {
      path: '/my/setting',
      async lazy() {
        const { SettingPage } = await import('../pages');
        return { Component: SettingPage };
      },
    },
    {
      path: '/my/sentence',
      async lazy() {
        const { UserSentencePage } = await import('../pages');
        return { Component: UserSentencePage };
      },
    },
    {
      path: '/my/like',
      async lazy() {
        const { UserLikePage } = await import('../pages');
        return { Component: UserLikePage };
      },
    },
  ],
};

export default userMenuRoute;
