import type {
  PaginationRequest,
  PaginationResult,
  Sentence,
  User,
} from '@/types';
import models from '../models';
import { getAuthenticatedUser } from './auth';
import {
  calculateSkip,
  convertSortOrderForDB,
  getPaginationResult,
} from './pagination';

/**
 * 인증된 사용자가 문장에 '좋아요'를 눌렀는지를 판단
 */
export const isUserLikedSentence = async (
  sentenceId: string,
): Promise<boolean> => {
  const user: User | null = await getAuthenticatedUser();
  if (!user) return false;
  const userLikes = await models.Like.exists({
    user: user._id,
    target: sentenceId,
  });
  return !!userLikes;
};

/**
 * 페이지네이션 문장 목록 형태를 반환하는 함수
 */
export const getPaginationSentences = async (
  filter: Record<keyof Sentence, any> | {} = {},
  { page, limit, sortBy = 'createdAt', sortOrder = 'desc' }: PaginationRequest,
): Promise<PaginationResult<Sentence>> => {
  const skip = calculateSkip(page, limit);
  const sort = { [sortBy]: convertSortOrderForDB(sortOrder) };
  const user = await getAuthenticatedUser();
  const [sentences, total] = await Promise.all([
    models.Sentence.find(filter)
      .populate('author', '_id name profileUrl')
      .populate('book')
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .lean<Sentence[]>(),
    models.Sentence.countDocuments(filter),
  ]);
  const sentenceIds = sentences.map(({ _id }) => _id);
  const likes = await models.Like.find({
    target: { $in: sentenceIds },
    user: user?._id,
  }).lean();

  return getPaginationResult<Sentence>({
    page,
    limit,
    total,
    list: sentences.map((sentence) => ({
      ...sentence,
      isLiked: !user
        ? false
        : likes.some((like: any) => like.target.equals(sentence?._id)),
    })),
  });
};
