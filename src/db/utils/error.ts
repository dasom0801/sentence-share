import type { ApiResponse } from '@/types';
import { HttpError } from '@/utils';
import { NextResponse } from 'next/server';

export const handleError = (
  error: unknown,
  statusCode = 500,
  message: string = 'INTERNAL_SERVER_ERROR',
): NextResponse<ApiResponse<null>> => {
  if (error instanceof HttpError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || message,
        error,
        data: null,
      },
      { status: error.status },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message,
      error,
      data: null,
    },
    { status: statusCode },
  );
};
