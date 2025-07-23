export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  BOOK_SENTENCES: (bookId: string) => `/books/${bookId}/sentences`,
  BOOK_SEARCH_KAKAO: '/books/external/kakao/search',
  GET_SENTENCE: (sentenceId: string) => `/sentences/${sentenceId}`,
  LIKE_SENTENCE: `/likes`,
  DISLIKE_SENTENCE: (id: string) => `/likes/sentence/${id}`,
} as const;
