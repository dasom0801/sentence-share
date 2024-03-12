import axios from './api';
import { loginWithGoogle, logoutWithGoogle } from './auth';
import { getUser, updateUser, getUserLike, getUserSentence } from './user';
import type { UserLikeRequestParams, UserSentenceRequestParams } from './user';
import {
  toggleSentenceLike,
  deleteSentence,
  searchBook,
  createSentence,
  getSentence,
  updateSentence,
  getSentences,
} from './sentence';
import type {
  BookSearchParams,
  CreateSentenceParams,
  UpdateSentenceParams,
} from './sentence';

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
  getSentence,
  updateSentence,
  getSentences,
};

export type {
  UserLikeRequestParams,
  UserSentenceRequestParams,
  BookSearchParams,
  CreateSentenceParams,
  UpdateSentenceParams,
};
