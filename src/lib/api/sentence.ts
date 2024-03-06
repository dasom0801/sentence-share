import { axios } from '.';

export const toggleSentenceLike = async (id: string) => {
  return await axios.put(`/api/sentence/${id}/like`);
};
