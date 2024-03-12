type Book = {
  _id: string;
  title: string;
  coverUrl: string;
  publisher: string;
  author: string[];
  isbn: string;
  sentence?: Sentence[];
  publishedAt?: Date;
};
