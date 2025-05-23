import axios from 'axios';
import { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTES_TOKEN}`;

interface SearchParams {
  query?: string;
  currentPage?: number;
  tagName?: string;
}

export const loadNotes = async ({ query, currentPage, tagName }: SearchParams) => {
  const response = await axios.get<{ notes: Note[] }>('/notes', {
    params: {
      search: query,
      page: currentPage,
      tag: tagName,
    },
  });
  return response.data;
};

export const destroyNote = async (noteId: number): Promise<void> => {
  await axios.delete(`/notes/${noteId}`);
};

export const retrieveNote = async (noteId: number): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
};
