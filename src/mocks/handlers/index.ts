import { apiRoutes } from '@/constants';
import { DefaultBodyType, HttpResponse, StrictRequest, http } from 'msw';
import { MockSentences } from '../data';

export const handlers = [
  http.get(`*${apiRoutes.user}`, () => {
    // 로그인 하지 않은 상태
    return HttpResponse.json(null, { status: 200 });
  }),

  http.get(`*${apiRoutes.sentences}`, ({ request }) => {
    return HttpResponse.json(getPaginationData(request), { status: 200 });
  }),

  http.get(`*/api/book/1/sentences`, ({ request }) => {
    return HttpResponse.json(getPaginationData(request), { status: 200 });
  }),
];

const getPaginationData = (request: StrictRequest<DefaultBodyType>) => {
  const data = MockSentences;
  const total = MockSentences.length;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 5;
  const list = data.slice((page - 1) * 2, limit);
  return {
    list,
    total,
    page,
    limit,
    pageTotal: Math.ceil(total / limit),
  };
};
