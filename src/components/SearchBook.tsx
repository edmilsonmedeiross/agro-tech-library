'use client';
import { api } from '@/lib/api';
import { AuthorProps } from '@/types/Author';
import { BookProps } from '@/types/Book';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import RegisterBookForm from './RegisterBookForm';
import BookCard, { BookCardProps } from './BookCard';

function SearchBook(props: { books: BookProps[]}) {
  const [booksOptions, _setBooksOptions] = useState(props.books || []);
  const [bookForEdit, setBookForEdit] = useState<BookCardProps>();
  const [authors, setAuthors] = useState<AuthorProps[]>([]);

  useEffect(() => {
    const getAuthors = async () => {
      const { data } = await api.get('/author');
      setAuthors(data);
    };

    getAuthors();
  }, []);


  const onChange = async (value: string) => {
    console.log(`selected ${value}`);

    const book = await api.get(`/books/${value}`);
    console.log(book);
    setBookForEdit(book.data);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };


  return (
    <div className="self-center">
      <Select
        showSearch
        placeholder="Selecione um livro ou pesquise por um"
        optionFilterProp="children"
        onChange={ onChange }
        onSearch={ onSearch }
        filterOption={ (input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={ booksOptions.map((book) => ({value: book.id, label: book.name})) }
      />

      { bookForEdit && (

        <div>
          <BookCard book={ bookForEdit } />
          <RegisterBookForm authors={ authors } book={ bookForEdit } context={ 'edit' } />
        </div>
      ) }
    </div>
  );
}

export default SearchBook;