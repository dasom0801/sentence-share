export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: unknown;
};

export type PaginationRequest = {
  page: number;
  limit: number;
  sortBy: 'createdAt' | 'likes';
  sortOrder: 'asc' | 'desc';
};

export type PaginationResult<T> = {
  list: T[]; // 실제 데이터 목록
  page: number; // 현재 페이지
  limit: number; // 페이지당 아이템 개수
  total: number; // 전체 아이템 개수
  totalPages: number; // 전체 페이지 개수
};
