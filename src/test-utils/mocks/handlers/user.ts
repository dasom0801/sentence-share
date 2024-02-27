import { rest } from 'msw';
import mockData from '../db';

export const getUser = rest.get('/api/user/me', (req, res, ctx) => {
  const user = mockData.user.getAll()[0];

  return res(ctx.json(user));
});

export const updateUser = rest.put('/api/user/me', async (req, res, ctx) => {
  const reqJson = await req.json();
  const user = mockData.user.update({
    where: {
      _id: {
        equals: '1',
      },
    },
    data: {
      ...reqJson,
    },
  });
  return res(ctx.json({ ...user }));
});
