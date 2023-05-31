// import { BookCardProps } from '@/types/Book';
import { type BookCardProps } from '@/components/BookCard';
import { atom } from 'jotai';

export const isVisibleAtom = atom<boolean>(false);
export const booksForRenderAtom = atom<BookCardProps[]>([]);
export const isVisibleEditModalAtom = atom<boolean>(false);
