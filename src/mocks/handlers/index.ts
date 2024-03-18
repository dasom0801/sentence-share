import { apiRoutes } from '@/constants';
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get(`*${apiRoutes.user}`, () => {
    // 로그인 하지 않은 상태
    return HttpResponse.json(null, { status: 200 });
  }),
];
