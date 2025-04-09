import { HttpError } from '@/lib/utils';
import { User } from '@/types';
import connectDB from '../connectDB';
import firebaseAdmin from '../firebase.config';
import models from '../models';
import { generateUserToken } from '../utils';

export const authWithGoogle = async (
  idToken: string,
): Promise<{ user: User; token: string }> => {
  try {
    await connectDB();
    if (!firebaseAdmin) {
      throw new HttpError('FIREBASE_ADMIN_NOT_INITIALIZED');
    }

    const verifyUser = await firebaseAdmin.auth().verifyIdToken(idToken);

    if (verifyUser) {
      const user = await models.User.findOne({
        uid: verifyUser.uid,
      }).lean<User>();
      if (user) {
        const token = generateUserToken(user._id);
        return {
          token,
          user,
        };
      } else {
        const { uid, name, provider, profileUrl, email } = verifyUser;
        if (!uid || !email) {
          throw new HttpError(
            'INVALID_USER_DATA',
            400,
            'Firebase token에 유효한 사용자 정보가 없습니다.',
          );
        }

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
        'Firebase ID token 디코딩에 실패했습니다.',
      );
    }
  } catch (error) {
    console.error(
      'google 사용자 인증 오류:',
      error instanceof HttpError ? error.message : error,
    );
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError();
  }
};
