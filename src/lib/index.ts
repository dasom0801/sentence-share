import {
  axios,
  loginWithGoogle,
  logoutWithGoogle,
  getUser,
  updateUser,
  getUserLike,
  getUserSentence,
  toggleSentenceLike,
  deleteSentence,
} from './api';

import { useUserQuery, usePagination } from './hooks';

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
  useUserQuery,
  usePagination,
};
