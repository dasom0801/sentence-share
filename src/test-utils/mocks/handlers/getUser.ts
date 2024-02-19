import { rest } from 'msw';
import user from '../data/user.json';

export const getUser = rest.get('/api/user/me', (req, res, ctx) => {
  return res(ctx.json(user));
});
