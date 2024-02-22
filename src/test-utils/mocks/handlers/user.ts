import { rest } from 'msw';
import user from '../data/user.json';

export const getUser = rest.get('/api/user/me', (req, res, ctx) => {
  return res(ctx.json(user));
});

export const updateUser = rest.put('/api/user/me', async (req, res, ctx) => {
  const reqJson = await req.json();
  return res(ctx.json({ ...reqJson.body }));
});
