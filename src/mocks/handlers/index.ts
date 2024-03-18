import { apiRoutes } from '@/constants';
import { HttpResponse, http } from 'msw';
import { MockSentences } from '../data';

export const handlers = [
  http.get(`*${apiRoutes.user}`, () => {
    // 로그인 하지 않은 상태
    return HttpResponse.json(null, { status: 200 });
  }),

  http.get(`*${apiRoutes.sentences}`, ({ request }) => {
    const data = MockSentences;
    const total = MockSentences.length;
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit'));
    const list = data.slice((page - 1) * 2, limit);

    return HttpResponse.json(
      {
        list,
        total,
        page,
        limit,
        pageTotal: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  }),
];
