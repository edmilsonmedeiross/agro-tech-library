// import { BookCardProps } from '@/types/Book';
import { type BookCardProps } from '@/components/BookCard';
import { AuthorProps } from '@/types/Author';
import { atom } from 'jotai';

export const isVisibleAtom = atom<boolean>(false);
export const booksForRenderAtom = atom<BookCardProps[]>([]);
export const totalBooksAtom = atom(0);
export const isVisibleEditModalAtom = atom<boolean>(false);
export const pageAtom = atom<number>(1);

//registerBooksAtom
export const authorOptionsAtom = atom<AuthorProps[]>([]);
export const isSubmitingAtom = atom(false);
export const openModalAtom = atom(false);

// searchBooksAtom

export const bookForEditAtom = atom<BookCardProps | undefined>(undefined);

// authorFormAtom
export const authorExistsAtom = atom(false);
