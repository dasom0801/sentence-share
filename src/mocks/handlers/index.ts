import { DefaultBodyType, HttpResponse, StrictRequest, http } from 'msw';
import { MockSentences, MockSentence } from '../data';

export const handlers = [
  http.get(`*/api/user/me`, () => {
    // 로그인 하지 않은 상태
    return HttpResponse.json(null, { status: 200 });
  }),

  http.get(`*/api/user/:userId/sentence`, ({ request }) => {
    return HttpResponse.json(getPaginationData(request), { status: 200 });
  }),

  http.get(`*/api/book/1/sentences`, ({ request }) => {
    return HttpResponse.json(getPaginationData(request), { status: 200 });
  }),

  http.get(`*/api/sentence/1`, () => {
    return HttpResponse.json({
      ...MockSentence,
    });
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
