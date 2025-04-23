'use server';

import { cookies } from 'next/headers';

// 서버에서 쿠키 문자열 추출
export const getServerCookieHeader = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  return accessToken ? `access_token=${accessToken}` : '';
};
