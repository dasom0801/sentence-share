'use server';
import { cookies } from 'next/headers';

export async function removeToken() {
  const cookie = cookies();
  cookie.delete('access_token');
}
