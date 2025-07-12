import { API_ENDPOINTS } from '@/api/constants';
import { Book, Sentence } from '@/types';
import { delay, http } from 'msw';
import { buildMswUrl, buildPaginationResponse } from '../builder';
import { MockBooks, MockSentence } from '../data';

export const handleGetBookSentence = (sentenceId?: string, limit = 6) => {
  const list: Sentence[] = Array.from({ length: limit }, (_, id) => ({
    ...MockSentence,
    _id: id.toString(),
    content: `Sentence ${id}`,
  }));

  if (sentenceId) {
    list.push({
      ...MockSentence,
      _id: sentenceId,
      content: `Sentence ${sentenceId}`,
    });
    limit++;
  }

  return http.get(buildMswUrl(API_ENDPOINTS.BOOK_SENTENCES(':bookId')), () => {
    return buildPaginationResponse<Sentence>(list, 1, limit);
  });
};

export const handleSearchBookWithKakaoAPI = (
  status: 'pending' | 'error' | 'fulfilled' = 'fulfilled',
) => {
  const url = buildMswUrl(API_ENDPOINTS.BOOK_SEARCH_KAKAO);
  if (status === 'pending') {
    return http.get(url, async () => {
      await delay('infinite');

      return new Response();
    });
  }

  return http.get(url, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const filteredBooks = MockBooks.filter((book) =>
      book.title.toLowerCase().includes(query?.toLowerCase() || ''),
    );
    return buildPaginationResponse<Book>(filteredBooks as Book[], 1);
  });
};
