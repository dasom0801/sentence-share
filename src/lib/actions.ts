'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/api/api';
import { cookies } from 'next/headers';

export async function deleteUserSentence(id: string): Promise<void> {
  await fetchAPI(`/api/sentence/${id}`, { method: 'DELETE' });
  revalidatePath('/my/sentence');
}

export async function updateUser(data: Record<string, any>): Promise<User> {
  const updatedUser = await fetchAPI<User>('/api/user/me', {
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

export async function createSentence({ content, book }: CreateSentenceParams) {
  await fetchAPI('/api/sentence', {
    method: 'POST',
    body: JSON.stringify({ book, content }),
  });

  revalidatePath('/');
}
export async function updateSentence({
  id,
  content,
  book,
}: CreateSentenceParams & { id: string }) {
  await fetchAPI(`/api/sentence/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content, book }),
  });
  revalidatePath('/my/sentence');
}

export async function removeToken() {
  const cookie = cookies();
  cookie.delete('access_token');
}
