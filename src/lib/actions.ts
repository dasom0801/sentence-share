'use server';

import { fetchAPI } from '@/lib/api/api';
import { ApiResponse, Book, User } from '@/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteUserSentence(id: string): Promise<void> {
  await fetchAPI(`/sentences/${id}`, { method: 'DELETE' });
  revalidatePath('/my/sentence');
}

export async function updateUser(
  data: Record<string, any>,
): Promise<ApiResponse<User>> {
  const updatedUser = await fetchAPI<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  revalidatePath('/my/setting');
  return updatedUser;
}

type CreateSentenceParams = {
  book: Book;
  content: string;
};

export async function updateSentence({
  id,
  content,
  book,
}: CreateSentenceParams & { id: string }) {
  await fetchAPI(`/sentences/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content, book }),
  });
  revalidatePath('/my/sentence');
}

export async function removeToken() {
  const cookie = cookies();
  cookie.delete('access_token');
}
