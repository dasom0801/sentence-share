'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/api/api';

export async function deleteUserSentence(id: string): Promise<void> {
  await fetchAPI(`/api/sentence/${id}`, { method: 'DELETE' });
  revalidatePath('/my/sentence');
}
