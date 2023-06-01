'use client';
import React from 'react';
import SelectAuthors from './SelectAuthors';
import { getBooksByAuthorId, getBooksPerPage, countBooks } from '@/actions';
import { booksForRenderAtom, totalBooksAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';
import { AuthorProps } from '@/types/Author';

function FilterBooksPerAuthor({ authors }: { authors: AuthorProps[] | undefined }) {
  const [, setNewBooksRender] = useAtom(booksForRenderAtom);
  const [, setTotalBooks] = useAtom(totalBooksAtom);

  const handleChange = async (value: string) => {
    const authorId = Number(value);
    const data = await getBooksByAuthorId(authorId);
    const total = await countBooks({ authorId });
    if (!data) return;
    setNewBooksRender(data);
    setTotalBooks(total);
  };

  const handleReset = async () => {
    const data = await getBooksPerPage(1, 10);
    if (!data) return;
    setNewBooksRender(data);
  };

  return (
    <div className="w-full flex max-sm:flex-col p-5 items-center justify-center gap-2 bg-purple-950">
      <SelectAuthors
        authorsOptions={ authors }
        onChange={ async (value) => {
          await handleChange(value);
        } }
        className="max-sm:w-full max-sm:mt-11"
      />
      <button type="button" className="bg-red-600 max-sm:w-full rounded-md p-1 text-white font-medium hover:bg-red-900" onClick={ handleReset }>Reset</button>
    </div>
  );
}

export default FilterBooksPerAuthor;