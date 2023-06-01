'use client';
import { AuthorProps } from '@/types/Author';
import React, { useEffect } from 'react';
import RegisterBookForm from './RegisterBookForm';
import BookCard, { BookCardProps } from './BookCard';
import SelectBooks from './SelectBooks';
import { category } from '@prisma/client';
import { useAtom } from 'jotai';
import { bookForEditAtom } from '@/jotai/atoms';

function SearchBook(props: {
  books?: BookCardProps[],
  authors: AuthorProps[] | undefined,
  categoriesOpitions: category[] | undefined,
  context: string,
  book?: BookCardProps | null,
}) {

  const [bookForEdit, setBookForEdit] = useAtom(bookForEditAtom);

  useEffect(() => {
    if (props.book) {
      setBookForEdit(props.book);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.book]);

  const onChange = async (value: string) => {
    if (props.books) {
      const book = props.books.find(({ id }) => id === value);
      setBookForEdit(book);
    }
  };

  return (
    <div>
      { props.books &&
        <SelectBooks
          booksOptions={ props.books }
          onChange={ onChange }
        />
      }
      
      { bookForEdit && (
        <div>
          <BookCard book={ bookForEdit } />
          <RegisterBookForm
            authors={ props.authors }
            book={ bookForEdit }
            context={ props.context }
            categoriesOptions={ props.categoriesOpitions }
          />
        </div>
      ) }
    </div>
  );
}

export default SearchBook;