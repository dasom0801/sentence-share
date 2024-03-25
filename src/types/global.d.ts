/// <reference path="./user.d.ts" />
/// <reference path="./sentence.d.ts" />
/// <reference path="./book.d.ts" />

import { SortBy, SortOrder } from './enum';

declare global {
  type FormControlData = Record<string, string>;

  interface PageParams {
    page?: string | number;
    limit?: string | number;
  }

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
