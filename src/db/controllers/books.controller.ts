/**
 * 문장 등록을 할 때 책 검색
 */

import type { Book, PaginationRequest, PaginationResult } from '@/types';
import { HttpError } from '@/utils/error';
import connectDB from '../connectDB';
import models from '../models';
import {
  getAuthenticatedUser,
  getPaginatedSentences,
  getPaginationResult,
} from '../utils';

/**
 * id를 통해 책 정보 가져오기
 */
export const getBook = async (bookId: string) => {
  await connectDB();
  const book = await models.Book.findById(bookId).lean<Book>();
  if (!book) {
    throw new HttpError('NOT_FOUND_BOOK', 404, '책을 찾을 수 없습니다.');
  }
  return book;
};

/**
 * 책에 등록된 문장 목록 가져오기
 */
export const getBookSentences = async ({
  bookId,
  mine,
  ...paginationRequest
}: {
  bookId: string;
  mine: boolean;
} & PaginationRequest) => {
  await connectDB();
  const book = await models.Book.findById(bookId);

  if (!book) {
    throw new HttpError('NOT_FOUND_BOOK', 404, '책을 찾을 수 없습니다.');
  }

  const user = await getAuthenticatedUser();

  // 로그인한 사용자가 작성한 문장만 가져오는 경우
  if (mine && !user) {
    throw new HttpError('Unauthorized', 401, '로그인 후 이용해주세요.');
  }
  const filter = {
    book: bookId,
    user: mine ? user?._id : null,
  };
  return await getPaginatedSentences(
    models.Sentence,
    filter,
    paginationRequest,
  );
};

/**
 * Kakao OpenAPI로 책 정보 검색
 */
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
    await connectDB();
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
