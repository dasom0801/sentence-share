import { API_ENDPOINTS } from '@/api/constants';
import { http } from 'msw';
import {
  buildErrorResponse,
  buildMswUrl,
  buildSuccessResponse,
} from '../builder';
import { MockSentence } from '../data';

export const handleGetSentence = (sentenceId?: string) => {
  return http.get(
    buildMswUrl(API_ENDPOINTS.GET_SENTENCE(':sentenceId')),
    () => {
      if (sentenceId === '500') {
        return buildErrorResponse('에러가 발생했습니다.');
      }

      return buildSuccessResponse(MockSentence);
    },
  );
};
