/**
 * 문장 등록을 할 때 책 검색
 */

import { HttpError } from '@/lib/utils';
import { Book, PaginationResult } from '@/types';
import { getPaginationResult } from '../utils';

export const searchBookWithKakaoOpenAPI = async ({
  query,
  page = 1,
  limit = 20,
}: {
  query: string;
  page: number;
  limit: number;
}): Promise<PaginationResult<Book>> => {
  try {
    const convertToBookType = (book: any) => {
      const { authors, isbn, publisher, title, thumbnail, datetime } = book;
      return {
        title,
        coverUrl: thumbnail,
        publisher,
        author: authors,
        isbn,
        publishedAt: datetime,
      };
    };

    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

    if (!KAKAO_API_KEY) {
      throw new Error('KAKAO_API_KEY 환경 변수가 추가되지 않았습니다.');
    }

    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}&size=${limit}&target=title`,
      {
        headers: {
          Authorization: `${process.env.KAKAO_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new HttpError('KAKAO_BOOK_SEARCH_ERROR', 500);
    }

    const data = await response.json();
    const { documents: list, meta } = data;

    return getPaginationResult({
      list: list.map(convertToBookType),
      total: meta.pageable_count,
      limit,
      page,
    });
  } catch (error) {
    console.error(error);
    throw new HttpError();
  }
};
