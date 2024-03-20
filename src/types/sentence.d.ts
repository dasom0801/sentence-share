type Sentence = {
  _id: string;
  content: string;
  likes: number;
  createdAt: string;
  author: Partial<User>;
  book?: Book;
  isLiked: boolean;
};
