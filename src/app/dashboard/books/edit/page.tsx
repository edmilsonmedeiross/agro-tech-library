import SearchBook from '@/components/SearchBook';
import { api } from '@/lib/api';
import { BookProps } from '@/types/Book';
import { AxiosResponse } from 'axios';
import React from 'react';

async function EditBook() {
  const { data }: AxiosResponse<BookProps[]> = await api.get('/books/edit');

  return (
    <>
      <h2 className="text-white text-2xl font-bold self-center">Edite um Livro!</h2>
      <SearchBook books={ data } />
    </>
  );
}

export default EditBook;