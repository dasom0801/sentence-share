'use server';

import { cookies } from 'next/headers';

export const getServerToken = async () => {
  const cookie = cookies();
  return cookie.get('access_token')?.value || null;
};
