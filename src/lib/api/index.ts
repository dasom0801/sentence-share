import { loginWithGoogle, logoutWithGoogle } from './auth';
import {
  getUser,
  updateUser,
  getUserLike,
  getUserSentences,
  deleteUser,
} from './user';
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
  loginWithGoogle,
  logoutWithGoogle,
  getUser,
  updateUser,
  getUserLike,
  getUserSentences as getUserSentence,
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
  BookSearchParams,
  CreateSentenceParams,
  UpdateSentenceParams,
  GetBookSentenceParams,
};
