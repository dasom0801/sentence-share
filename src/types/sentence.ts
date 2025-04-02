import { Book } from './book';
import { User } from './user';

export type Sentence = {
  _id: string;
  content: string;
  createdAt: string;
  author: Partial<User>;
  book: Book;
  isLiked: boolean;
  likes?: number;
};
