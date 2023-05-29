import { BookProps } from '@/types/Book';
import { atom } from 'jotai';

export const isVisibleAtom = atom(false);
export const booksForRenderAtom = atom<BookProps[]>([]);