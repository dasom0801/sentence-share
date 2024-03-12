import axios from './api';
import { loginWithGoogle, logoutWithGoogle } from './auth';
import { getUser, updateUser, getUserLike, getUserSentence } from './user';
import type { UserLikeRequestParams, UserSentenceRequestParams } from './user';
import {
  toggleSentenceLike,
  deleteSentence,
  searchBook,
  createSentence,
} from './sentence';
import type { BookSearchParams, CreateSentenceParams } from './sentence';

export {
  axios,
  loginWithGoogle,
  logoutWithGoogle,
  getUser,
  updateUser,
  getUserLike,
  getUserSentence,
  toggleSentenceLike,
  deleteSentence,
  searchBook,
  createSentence,
};

export type {
  UserLikeRequestParams,
  UserSentenceRequestParams,
  BookSearchParams,
  CreateSentenceParams,
};
