/// <reference path="./user.d.ts" />
/// <reference path="./sentence.d.ts" />
/// <reference path="./book.d.ts" />

declare global {
  type FormControlData = Record<string, string>;

  // server에서 기본값 설정했기 때문에 optional
  type PageParams = {
    page?: string | number;
    limit?: string | number;
  };

  type PaginationResult<T> = {
    list: T[];
    page: number;
    limit: number;
    total: number;
  };
}

export {};
