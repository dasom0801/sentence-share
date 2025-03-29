import type {
  Book,
  PaginationRequest,
  PaginationResult,
  Sentence,
} from '@/types';
import models from '../models';
import {
  getAuthenticatedUser,
  getPaginatedSentences,
  isUserLikedSentence,
} from '../utils';

import { HttpError } from '@/lib/utils';
import connectDB from '../connectDB';

/**
 * 페이지네이션으로 문장 목록 가져오기
 */
export const getSentences = async (
  paginationRequest: PaginationRequest,
): Promise<PaginationResult<Sentence>> => {
  try {
    await connectDB();
    return await getPaginatedSentences(models.Sentence, {}, paginationRequest);
  } catch (error) {
    console.error(error);
    throw new HttpError();
  }
};

/**
 *  id를 통해 특정 문장 가져오기
 */
export const getSentence = async (id: string): Promise<Sentence | null> => {
  try {
    await connectDB();
    const sentencePromise = models.Sentence.findById(id)
      .populate('author', '_id name profileUrl')
      .populate('book')
      .lean<Sentence>();

    const isLikedPromise = isUserLikedSentence(id);
    const [sentence, isLiked] = await Promise.all([
      sentencePromise,
      isLikedPromise,
    ]);

    if (!sentence) {
      throw new HttpError(
        'NOT_FOUND_SENTENCE',
        404,
        '문장을 찾을 수 없습니다. ',
      );
    }

    return { ...sentence, isLiked };
  } catch (error) {
    console.error(`문장 조회 오류 ID: ${id}`, error);
    throw new HttpError();
  }
};

/**
 * 신규 문장 등록하기
 */
export const createSentence = async (book: Book, content: string) => {
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('Unauthorized', 401);
    }
    if (!content || !book) {
      throw new HttpError('BAD_REQUEST', 400);
    }

    const { title, coverUrl, publisher, author, isbn, publishedAt } = book;
    const selectedBook = await models.Book.findOneAndUpdate(
      { isbn },
      { title, coverUrl, publisher, author, isbn, publishedAt },
      { new: true, upsert: true },
    );

    const sentence = await models.Sentence.create({
      content,
      book: selectedBook._id,
      author: user._id,
    });

    return sentence;
  } catch (error) {
    console.error('Sentence 작성 실패', error);
    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      500,
      error instanceof Error ? error.message : undefined,
    );
  }
};

type UpdateSentenceParams = {
  sentenceId: string;
  content: String;
  book: Book;
};
/**
 * 문장 내용 갱신하기
 */
export const updateSentence = async ({
  sentenceId,
  content,
  book,
}: UpdateSentenceParams) => {
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('USER_NOT_EXISTS', 401);
    }
    if (!content || !book) {
      throw new HttpError('BAD_REQUEST', 400);
    }

    const sentence =
      await models.Sentence.findById(sentenceId).lean<Sentence>();
    if (!sentence) {
      throw new HttpError('SENTENCE_NOT_FOUND', 404);
    }

    if (sentence.author.toString() !== user._id.toString()) {
      throw new HttpError('FORBIDDEN', 403);
    }

    const updatedSentence = await models.Sentence.findByIdAndUpdate(
      sentenceId,
      { content, book: book._id },
      { new: true },
    );

    return updatedSentence;
  } catch (error) {
    console.error('Sentence 수정 실패', error);
    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      500,
      error instanceof Error ? error.message : undefined,
    );
  }
};

/**
 * 문장 삭제하기
 */
export const deleteSentence = async (id: string) => {
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('USER_NOT_EXISTS', 401);
    }

    const sentence = await models.Sentence.findById(id).lean<Sentence>();
    if (!sentence) {
      throw new HttpError(
        'SENTENCE_NOT_FOUND',
        404,
        '문장이 존재하지 않습니다.',
      );
    }

    if (sentence.author._id !== user._id) {
      throw new HttpError('FORBIDDEN', 403);
    }

    await Promise.all([
      models.Like.deleteMany({ target: id, category: 'sentence' }),
      models.Sentence.findByIdAndDelete(id),
    ]);
    return true;
  } catch (error) {
    console.error('Sentence 삭제 실패', error);
    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      500,
      error instanceof Error ? error.message : undefined,
    );
  }
};
