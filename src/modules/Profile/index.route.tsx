import { RouteObject } from 'react-router-dom';

const ProfileRoutes: RouteObject[] = [
  {
    path: '/profile',
    async lazy() {
      const { Profile: Component } = await import('.');
      return { Component };
    },
    children: [
      {
        path: '/profile/sentence',
        async lazy() {
          const { ProfileSentence: Component } = await import('.');
          return { Component };
        },
      },
      {
        path: '/profile/likes',
        async lazy() {
          const { ProfileLikes: Component } = await import('.');
          return { Component };
        },
      },
      {
        path: '/profile/setting',
        async lazy() {
          const { ProfileSetting: Component } = await import('.');
          return { Component };
        },
      },
    ],
  },
];

export default ProfileRoutes;
