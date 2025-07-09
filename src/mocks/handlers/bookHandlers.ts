import { API_ENDPOINTS } from '@/api/constants';
import { Sentence } from '@/types';
import { http } from 'msw';
import { buildMswUrl, buildPaginationResponse } from '../builder';
import { MockSentence } from '../data';

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
