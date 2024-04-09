import { SortBy, SortOrder } from '@/types/enum';

export const getBearerToken = () => {
  const token = localStorage.getItem('access_token');
  const authorization = token ? `Bearer ${token}` : null;
  return authorization;
};

// searchPrams를 object로 변환
export const getSearchParamsObject = (
  searchParams: URLSearchParams,
): { [key: string]: string } => {
  return Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );
};

// SortBy 타입에 맞는 값으로 전달
export const getSortByValue = (sortBy: string | null): SortBy => {
  switch (sortBy) {
    case 'createdAt':
      return SortBy.CreatedAt;
    case 'likes':
      return SortBy.Likes;
    default:
      return SortBy.CreatedAt;
  }
};

export const getSortOrderValue = (sortOrder: string | null): SortOrder => {
  switch (sortOrder) {
    case '-1':
      return SortOrder.DESC;
    case '1':
      return SortOrder.ASC;
    default:
      return SortOrder.DESC;
  }
};
