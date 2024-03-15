/// <reference path="./user.d.ts" />
/// <reference path="./sentence.d.ts" />
/// <reference path="./book.d.ts" />

import { SortBy, SortOrder } from './enum';

declare global {
  type FormControlData = Record<string, string>;

  // server에서 기본값 설정했기 때문에 optional
  type PageParams = {
    page?: string | number;
    limit?: string | number;
  };

  type SortParams = {
    sortBy?: string;
    sortOrder?: string;
  };

  type PaginationResult<T> = {
    list: T[];
    page: number;
    limit: number;
    total: number;
    pageTotal: number;
  };

  type SortType = { sortBy: SortBy; sortOrder: SortOrder };

  type APIRequestParams = Partial<PageParams & SortType>;
}

export {};
