import { PaginationRequest, PaginationResult } from '@/types';

// 페이지 시작 계산
export const calculateSkip = (page: number, limit: number): number => {
  return Math.max((page - 1) * limit, 0);
};

// sortBy 타입 체크
const isValidSortBy = (value: any): value is 'createdAt' | 'likes' => {
  return value === 'createdAt' || value === 'likes';
};

// sortOrder 타입 체크
const isValidSortOrder = (value: any): value is 'asc' | 'desc' => {
  return value === 'asc' || value === 'desc';
};

// query를 받아서 PaginationRequest 타입으로 변환
export const parseQuery = ({
  page,
  limit,
  sortBy,
  sortOrder,
}: Partial<Record<keyof PaginationRequest, string>>): PaginationRequest => ({
  page: page ? Number(page) : 1,
  limit: limit ? Number(limit) : 20,
  sortBy: isValidSortBy(sortBy) ? sortBy : 'createdAt',
  sortOrder: isValidSortOrder(sortOrder) ? sortOrder : 'asc',
});

// DB 요청을 위해 sortOrder를 숫자로 변환
export const convertSortOrderForDB = (sortOrder: 'asc' | 'desc'): 1 | -1 => {
  return sortOrder === 'asc' ? 1 : -1;
};

// params를 받아서 pagination 타입으로 반환한다.
export const getPaginationResult = <T>({
  page,
  limit,
  list,
  total,
}: Omit<PaginationResult<T>, 'totalPages'>): PaginationResult<T> => {
  return {
    list,
    page: Number(page),
    limit: Number(limit),
    total: Number(total),
    totalPages: Math.ceil(total / limit),
  };
};
