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
    <div>
      <SelectAuthors
        authorsOptions={ authors }
        onChange={ (value) => {
          handleChange(value);
        } }
      />
      <button type="button" onClick={ handleReset }>Reset</button>
    </div>
  );
}

export default FilterBooksPerAuthor;