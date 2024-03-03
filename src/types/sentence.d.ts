type Sentence = {
  _id: string;
  content: string;
  likes: number;
  createdAt: string;
  author: User;
  book?: Book;
};
