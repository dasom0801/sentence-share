'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/api/api';

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
