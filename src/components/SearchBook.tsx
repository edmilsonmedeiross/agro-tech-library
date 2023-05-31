'use client';
import { AuthorProps } from '@/types/Author';
import React, { useState } from 'react';
import RegisterBookForm from './RegisterBookForm';
import BookCard, { BookCardProps } from './BookCard';
import SelectBooks from './SelectBooks';
import { category } from '@prisma/client';

function SearchBook(props: {
  books?: BookCardProps[],
  authors: AuthorProps[] | undefined,
  categoriesOpitions: category[] | undefined,
  context?: string,
  book?: BookCardProps | null,
}) {

  const [bookForEdit, setBookForEdit] = useState<BookCardProps | undefined>(props.book || undefined);

  const onChange = async (value: string) => {
    console.log(`selected ${value}`);
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
            context={ 'edit' }
            categoriesOptions={ props.categoriesOpitions }
          />
        </div>
      ) }
    </div>
  );
}

export default SearchBook;