import axios from './api';
import { loginWithGoogle, logoutWithGoogle } from './auth';
import {
  getUser,
  updateUser,
  getUserLike,
  getUserSentence,
  deleteUser,
} from './user';
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

import { getBook, getBookSentence } from './book';
import type { GetBookSentenceParams } from './book';

export {
  axios,
  loginWithGoogle,
  logoutWithGoogle,
  getUser,
  updateUser,
  getUserLike,
  getUserSentence,
  deleteUser,
  toggleSentenceLike,
  deleteSentence,
  searchBook,
  createSentence,
  getSentence,
  updateSentence,
  getSentences,
  getBookSentence,
  getBook,
};

export type {
  UserLikeRequestParams,
  UserSentenceRequestParams,
  BookSearchParams,
  CreateSentenceParams,
  UpdateSentenceParams,
  GetBookSentenceParams,
};
