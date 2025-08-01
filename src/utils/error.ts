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
