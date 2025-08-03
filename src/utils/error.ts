export class HttpError extends Error {
  constructor(
    public code: string = 'INTERNAL_SERVER_ERROR',
    public status: number = 500,
    message?: string,
  ) {
    super(message || code);
    this.name = 'HttpError';
  }
}

export class ApiError extends Error {
  status: number;
  code?: string;
  response?: any;

  constructor(responseBody: any) {
    super(responseBody.message || 'API Error');
    this.name = 'ApiError';
    this.status = responseBody.error?.status ?? 500;
    this.code = responseBody.error?.code;
    this.response = responseBody;
  }
}

export const withErrorHandler = async <T>(
  operation: () => Promise<T>,
  context?: string,
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (context) {
      console.error(`${context} 실패:`, error);
    }

    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      500,
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.',
    );
  }
};
