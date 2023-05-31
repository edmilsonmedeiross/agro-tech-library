'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { booksForRenderAtom } from '@/jotai/atoms';
import { getBooksPerPage } from '@/actions';
import BookCard from './BookCard';

function PaginationComponent () {
  const [newBooksRender, setNewBooksRender] = useAtom(booksForRenderAtom);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = newBooksRender.length;
  console.log('total', total);
  

  const fetchBooks = async () => {
    const data = await getBooksPerPage(page, pageSize);

    if (!data) return;
    
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClickNext = () => {
    setPage(prev => prev + 1);
  };

  const handleClickPrev = () => {
    setPage(prev => prev - 1);
  };


  return (
    <div>
      {
        total >= pageSize &&
        <Link href={ `/?page=${page}` }>
          <button type="button"onClick={ handleClickNext }>Next</button>
        </Link>
      }

      {
        page > 1 &&
        <Link href={ `/?page=${page}` }>
          <button type="button"onClick={ handleClickPrev }>Prev</button>
        </Link>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          newBooksRender
          && newBooksRender.map((book) => (
            <BookCard
              key={ book.id }
              book={ book }
            />
          ))
        }
      </div>
      {
        total >= pageSize &&
        <Link href={ `/?page=${page}` }>
          <button type="button"onClick={ handleClickNext }>Next</button>
        </Link>
      }

      {
        page > 1 &&
        <Link href={ `/?page=${page}` }>
          <button type="button"onClick={ handleClickPrev }>Prev</button>
        </Link>
      }
    </div>
  );
}

export default PaginationComponent;