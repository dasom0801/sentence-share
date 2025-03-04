import { ApiResponse, PaginationResult } from './api';
import { Sentence } from './sentence';

export type Book = {
  _id: string;
  title: string;
  coverUrl: string;
  publisher: string;
  author: string[];
  isbn: string;
  sentence?: Sentence[];
  publishedAt?: Date;
};

export type BookResponse = ApiResponse<Sentence>;
export type BooksResponse = ApiResponse<PaginationResult<Sentence>>;
