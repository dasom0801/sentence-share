import { ApiResponse, PaginationResult } from './api';
import { Book } from './book';
import { User } from './user';

export type Sentence = {
  _id: string;
  content: string;
  likes: number;
  createdAt: string;
  author: Partial<User>;
  book: Book;
  isLiked: boolean;
};

export type SentenceResponse = ApiResponse<Sentence>;
export type SentencesResponse = ApiResponse<PaginationResult<Sentence>>;
