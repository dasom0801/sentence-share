import { HttpError } from '@/lib/utils';
import { User } from '@/types';
import connectDB from '../connectDB';
import models from '../models';
import { generateUserToken } from '../utils';

export const authWithGoogle = async (
  idToken: string | undefined,
): Promise<{ user: User; token: string }> => {
  try {
    await connectDB();
    if (!idToken) {
      throw new HttpError(
        'FIREBASE_ID_TOKEN_MISSING',
        400,
        'Firebase ID Token이 전달되지 않아 로그인에 실패했습니다.',
      );
    }
    const verifyUser = await firebaseAdmin?.auth().verifyIdToken(idToken);
    if (verifyUser) {
      const user = await models.User.findOne({
        uid: verifyUser?.uid,
      }).lean<User>();
      if (user) {
        const token = generateUserToken(user._id);
        return {
          token,
          user,
        };
      } else {
        const { uid, name, provider, profileUrl, email } = verifyUser;
        const user = await models.User.create({
          uid,
          name,
          provider,
          profileUrl,
          email,
        });
        const token = generateUserToken(user._id);
        return {
          user,
          token,
        };
      }
    } else {
      throw new HttpError(
        'FIREBASE_DECODING_FAILED',
        400,
        'Firebase ID token에 실패했습니다. ',
      );
    }
  } catch (error) {
    console.error('google 사용자 인증 오류:', error instanceof HttpError);
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError();
  }
};
