import type {
  PaginationRequest,
  PaginationResult,
  Sentence,
  User,
} from '@/types';
import mongoose from 'mongoose';
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
 *  페이지네이션 유틸 함수
 */
export const getPaginatedSentences = async (
  model: mongoose.Model<any>,
  filter: Record<string, any> = {},
  pagination: PaginationRequest,
  populateTargetField?: string,
): Promise<PaginationResult<Sentence>> => {
  const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = calculateSkip(page, limit);
  const sort = { [sortBy]: convertSortOrderForDB(sortOrder) };
  const user = await getAuthenticatedUser();

  const [items, total] = await Promise.all([
    model
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate({
        path: populateTargetField ?? '_id', // populateTargetField가 없으면 _id를 기준으로 populate
        model: 'Sentence',
        populate: [
          { path: 'author', select: '_id name profileUrl' },
          { path: 'book' },
        ],
      })
      .lean(),
    model.countDocuments(filter),
  ]);

  const sentences = populateTargetField
    ? items.map((item) => item[populateTargetField])
    : items;
  const sentenceIds = sentences.map(({ _id }) => _id);

  const likes = user
    ? await models.Like.find({
        target: { $in: sentenceIds },
        user: user?._id,
      }).lean()
    : [];

  return getPaginationResult<Sentence>({
    page,
    limit,
    total,
    list: sentences.map((sentence) => ({
      ...sentence,
      isLiked: user
        ? likes.some((like: any) => like.target.equals(sentence._id))
        : false,
    })),
  });
};
