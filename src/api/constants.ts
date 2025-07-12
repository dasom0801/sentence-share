export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  BOOK_SENTENCES: (bookId: string) => `/books/${bookId}/sentences`,
  BOOK_SEARCH_KAKAO: '/books/external/kakao/search',
} as const;
