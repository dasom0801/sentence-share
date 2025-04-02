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
