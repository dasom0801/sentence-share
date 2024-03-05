import axios from './api';
import { loginWithGoogle, logoutWithGoogle } from './auth';
import { getUser, updateUser, getUserLike, getUserSentence } from './user';
import type { UserLikeRequestParams, UserSentenceRequestParams } from './user';

export {
  axios,
  loginWithGoogle,
  logoutWithGoogle,
  getUser,
  updateUser,
  getUserLike,
  getUserSentence,
};

export type { UserLikeRequestParams, UserSentenceRequestParams };
