import { PaginationResult } from '@/types';
import { HttpResponse } from 'msw';

// 성공 응답
export const buildSuccessResponse = <T>(data: T) => {
  return HttpResponse.json({
    data,
    success: true,
    message: 'Success',
  });
};

// 페이지네이션 응답
export const buildPaginationResponse = <T>(
  list: T[],
  page = 1,
  limit = 10,
  total?: number,
) => {
  const totalCount = total ?? list.length;
  const totalPages = Math.ceil(totalCount / limit);

  return HttpResponse.json({
    data: {
      list,
      page,
      limit,
      total: totalCount,
      totalPages,
    },
  } satisfies { data: PaginationResult<T> });
};

// 에러 응답
export const buildErrorResponse = (
  message: string,
  code = 'INTERNAL_ERROR',
  status = 500,
) => {
  return HttpResponse.json(
    {
      error: {
        code,
        message,
      },
      success: false,
    },
    { status },
  );
};
