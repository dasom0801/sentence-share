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

import { HttpError, withErrorHandler } from '@/utils/error';
import connectDB from '../connectDB';

/**
 * 페이지네이션으로 문장 목록 가져오기
 */
export const getSentences = async (
  paginationRequest: PaginationRequest,
): Promise<PaginationResult<Sentence>> => {
  return withErrorHandler(async () => {
    await connectDB();
    return await getPaginatedSentences(models.Sentence, {}, paginationRequest);
  }, '문장 목록 가져오기');
};

/**
 *  id를 통해 특정 문장 가져오기
 */
export const getSentence = async (id: string): Promise<Sentence | null> => {
  return withErrorHandler(async () => {
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
  }, `문장 가져오기(id: ${id})`);
};

/**
 * 신규 문장 등록하기
 */
export const createSentence = async (book: Book, content: string) => {
  return withErrorHandler(async () => {
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
  }, '신규 문장 등록하기');
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
  return withErrorHandler(async () => {
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
  }, `문장 수정(${sentenceId})`);
};

/**
 * 문장 삭제하기
 */
export const deleteSentence = async (id: string) => {
  return withErrorHandler(async () => {
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

    if (sentence.author.toString() !== user._id.toString()) {
      throw new HttpError('FORBIDDEN', 403);
    }

    await Promise.all([
      models.Like.deleteMany({ target: id, category: 'sentence' }),
      models.Sentence.findByIdAndDelete(id),
    ]);
    return true;
  }, `문장 삭제 실패: ${id}`);
};
