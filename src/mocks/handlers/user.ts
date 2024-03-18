import { http, HttpResponse } from 'msw';
import mockData from '../db';

export const getUser = http.get('*/api/user/me', () => {
  const user = mockData.user.getAll()[0];
  return HttpResponse.json(user, { status: 200 });
});

export const updateUser = http.put('*/api/user/me', async ({ request }) => {
  const data = JSON.parse(JSON.stringify(await request.json()));
  const user = mockData.user.update({
    where: {
      _id: {
        equals: '1',
      },
    },
    data,
  });
  return HttpResponse.json(user, { status: 200 });
});

export const getUserSentence = http.get('*/api/user/1/sentence', () => {
  const user = mockData.user.getAll()[0];
  const sentence = user?.sentence;
  return HttpResponse.json({ list: sentence }, { status: 400 });
});
