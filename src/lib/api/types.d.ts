export interface UserListRequestParams extends PageParams {
  userId?: string;
}

export interface BookSentenceListParams extends PageParams {
  bookId?: string;
}

export interface SentenceDetailParams {
  sentenceId?: string;
}

export interface BookSearchParams {
  query: string;
  page: number;
}
