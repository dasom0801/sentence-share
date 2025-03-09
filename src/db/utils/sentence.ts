import type { User } from '@/types';
import models from '../models';
import { getAuthenticatedUser } from './auth';

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
