import { axios } from '.';

export const toggleSentenceLike = async (id: string) => {
  return await axios.put(`/api/sentence/${id}/like`);
};

export const deleteSentence = async (id: string) => {
  return await axios.delete(`/api/sentence/${id}`);
};
