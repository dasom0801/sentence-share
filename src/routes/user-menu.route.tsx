import { RouteObject } from 'react-router-dom';

const userMenuRoute: RouteObject = {
  path: '/my',
  children: [
    {
      path: '/my/setting',
      async lazy() {
        const { SettingPage } = await import('@/feature/setting');
        return { Component: SettingPage };
      },
    },
    {
      path: '/my/sentence',
      async lazy() {
        const { UserSentencePage } = await import('@/feature/user-sentence');
        return { Component: UserSentencePage };
      },
    },
    {
      path: '/my/like',
      async lazy() {
        const { UserLikePage } = await import('@/feature/user-like');
        return { Component: UserLikePage };
      },
    },
  ],
};

export default userMenuRoute;
