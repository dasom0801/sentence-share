import { HttpError } from '@/utils';
import { models } from 'mongoose';
import connectDB from '../connectDB';
import { getAuthenticatedUser } from '../utils';

/**
 * category와 target의 Id로 like 추가하기
 */
export const addLike = async ({
  category,
  target,
}: {
  category: 'sentence' | 'book';
  target: string;
}) => {
  if (!category || !target) {
    throw new HttpError('BAD_REQUEST', 400);
  }
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('UNAUTHORIZED', 401, '로그인 후 이용해주세요.');
    }

    const model = {
      sentence: models.Sentence,
      book: models.Book,
    }[category];

    const foundTarget = await model.findById(target);

    if (!foundTarget) {
      throw new HttpError(
        'NOT_FOUND',
        404,
        `${category}-${target}를 찾을 수 없습니다.`,
      );
    }

    await models.Like.create({ user: user._id, category, target });
    return true;
  } catch (error) {
    console.error(`Like 추가 에러 ${category}-${target}`, error);
    throw new HttpError();
  }
};

/**
 * Like 삭제
 */
export const deleteLike = async ({
  target,
  category,
}: {
  target: string;
  category: 'sentence' | 'book';
}) => {
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('UNAUTHORIZED', 401, '로그인 후 이용해주세요.');
    }

    const foundLike = await models.Like.findOne({
      target,
      category,
    });
    if (!foundLike) {
      throw new HttpError(
        'NOT_FOUND',
        404,
        `${category}-${target}를 찾을 수 없습니다.`,
      );
    }

    await models.Like.deleteOne({ _id: foundLike._id });
    return true;
  } catch (error) {
    console.error(`Like 취소 에러 ${category}-${target}`, error);
    throw new HttpError();
  }
};
