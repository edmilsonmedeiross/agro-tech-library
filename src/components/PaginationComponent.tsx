'use client';
import React, { useEffect, useState } from 'react';

import { BookProps } from '@/types/Book';

import Link from 'next/link';
import { AxiosResponse } from 'axios';
import { api } from '@/lib/api';
import { useAtom } from 'jotai';
import { booksForRenderAtom } from '@/jotai/atoms';

function PaginationComponent () {
  const [newBooksRender, setNewBooksRender] = useAtom(booksForRenderAtom);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = newBooksRender.length;

  const fetchBooks = async () => {
    const { data }: AxiosResponse<BookProps[]> = await api.get(`/books?page=${page}`);

    if (data.length === 0) {
      setPage(prev => prev - 1);
    }

    setNewBooksRender(data);

  };


  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
  
    fetchBooks();
  }, [page]);
 

  const handleClickNext = () => {
    setPage(prev => prev + 1);
  };

  const handleClickPrev = () => {
    setPage(prev => prev - 1);
  };


  return (
    <div>
      {total > pageSize &&
      <Link href={ `/?page=${page}` }><button type="button"onClick={ handleClickNext }>Next</button></Link>}
      {page > 1 &&
      <Link href={ `/?page=${page}` }><button type="button"onClick={ handleClickPrev }>Prev</button></Link>}
    </div>
  );
}

export default PaginationComponent;