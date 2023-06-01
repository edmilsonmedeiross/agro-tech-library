'use client';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { booksForRenderAtom, pageAtom, totalBooksAtom } from '@/jotai/atoms';
import { getBooksPerPage, countBooks } from '@/actions';
import BookCard from './BookCard';
import LoadingScreen from '@/app/loading';
import PaginationTags from './PaginationTags';

const PAGE_SIZE = 10;

function PaginationComponent () {
  const [newBooksRender, setNewBooksRender] = useAtom(booksForRenderAtom);
  const [, setTotalBooks] = useAtom(totalBooksAtom);
  const [page, setPage] = useAtom(pageAtom);


  const fetchBooks = async () => {
    const [data, total] = await Promise.all([getBooksPerPage(page, PAGE_SIZE), countBooks()]);

    if (!data) return;
    
    if (data.length === 0) {
      setPage(prev => prev - 1);
    }
    setNewBooksRender(data);
    setTotalBooks(total);
  };

  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
    fetchBooks().catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <PaginationTags pageSize={ PAGE_SIZE } />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:px-2">
        {
          newBooksRender.length ? newBooksRender.map((book) => (
            <BookCard
              key={ book.id }
              book={ book }
            />
          )) : <LoadingScreen />
        }
      </div>
      <PaginationTags pageSize={ PAGE_SIZE } />
    </div>
  );
}

export default PaginationComponent;