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

  type SortType = { sortBy: SortBy; sortOrder: SortOrder };

  type APIRequestParams = Partial<PageParams & SortType>;
}

export {};
