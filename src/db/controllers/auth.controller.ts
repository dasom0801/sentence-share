import { HttpError } from '@/lib/utils';
import { User } from '@/types';
import connectDB from '../connectDB';
import models from '../models';
import { generateUserToken } from '../utils';

export const authWithGoogle = async ({
  uid,
  name,
  provider,
  profileUrl,
  email,
}: User): Promise<{ user: User; token: string }> => {
  try {
    await connectDB();
    const user = await models.User.findOne({ uid }).lean<User>();
    if (user) {
      const token = generateUserToken(user._id);
      return {
        token,
        user,
      };
    } else {
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
  } catch (error) {
    console.error('google 사용자 인증 오류:', error);
    throw new HttpError();
  }
};
