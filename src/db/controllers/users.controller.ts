import { HttpError } from '@/lib/utils';
import { PaginationRequest, User } from '@/types';
import connectDB from '../connectDB';
import firebaseAdmin from '../firebase.config';
import models from '../models';
import {
  getAuthenticatedUser,
  getLoginUserId,
  getPaginationSentences,
} from '../utils';

/**
 * 로그인한 사용자 정보를 반환
 */
export const getUserInfo = async (): Promise<User> => {
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('UNAUTHORIZED', 401, '로그인 후 이용해주세요.');
    }
    return user;
  } catch (error) {
    console.error(`사용자 정보 가져오기 실패`, error);
    throw new HttpError();
  }
};

/**
 * 로그인한 사용자의 정보를 수정
 */
export const editUserInfo = async ({
  name,
  profileUrl,
}: {
  name: string;
  profileUrl: string;
}): Promise<User> => {
  try {
    await connectDB();
    const userId = getLoginUserId();
    if (!userId) {
      throw new HttpError('UNAUTHORIZED', 401, '로그인 후 이용해주세요.');
    }
    const updatedUserInfo = await models.User.findByIdAndUpdate(
      userId,
      { name, profileUrl },
      { new: true },
    );

    if (!updatedUserInfo) {
      throw new HttpError('NOT_FOUND', 404, '사용자를 찾을 수 없습니다.');
    }

    return updatedUserInfo;
  } catch (error) {
    console.error('사용자 정보 수정 실패', error);
    throw new HttpError();
  }
};

/**
 * 회원 탈퇴
 */
export const deleteUser = async () => {
  try {
    await connectDB();
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new HttpError('UNAUTHORIZED', 401, '로그인 후 이용해주세요.');
    }

    await Promise.all([
      models.Like.deleteMany({ user: user._id }), //좋아요 삭제
      models.Sentence.deleteMany({ author: user._id }), // 작성한 문장 삭제
      models.User.findByIdAndDelete(user._id), // 사용자 정보 삭제
    ]);

    try {
      firebaseAdmin.auth().revokeRefreshTokens(user.uid); // 토큰 취소
      firebaseAdmin.auth().deleteUser(user.uid); // firebase auth에서 사용자 삭제
    } catch (error) {
      console.error(`firebase 회원 탈퇴 요청 실패`, error);
      throw new HttpError(
        'FIREBASE_ERROR',
        500,
        'Firebase 사용자 삭제 중 오류 발생',
      );
    }

    return true;
  } catch (error) {
    console.error(`사용자 탈퇴 실패`, error);
    throw new HttpError();
  }
};

/**
 * 내가 작성한 문장 목록 가져오기
 */
export const getMySentences = async (params: PaginationRequest) => {
  try {
    const userId: string | null = getLoginUserId();
    if (!userId) {
      throw new HttpError('UNAUTHORIZED', 401, '로그인 후 이용해주세요.');
    }
    return await getUserSentences({ userId, ...params });
  } catch (error) {
    console.error('내가 작성한 문장 목록 가져오기 실패', error);
    throw new HttpError();
  }
};

/**
 * 특정 사용자가 작성한 문장 목록 가져오기
 */
export const getUserSentences = async ({
  userId,
  ...paginationRequest
}: { userId: string } & PaginationRequest) => {
  try {
    await connectDB();
    const user = await models.User.findById(userId);
    if (!user) {
      throw new HttpError('NOT_FOUND_USER', 404, '사용자를 찾을 수 없습니다.');
    }
    const filter = { author: userId };
    return await getPaginationSentences(filter, paginationRequest);
  } catch (error) {
    console.error(`사용자가 작성한 문장 가져오기 실패-${userId}`, error);
    throw new HttpError();
  }
};
