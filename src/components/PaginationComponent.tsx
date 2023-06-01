'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { booksForRenderAtom, pageAtom, totalBooksAtom } from '@/jotai/atoms';
import { getBooksPerPage, countBooks } from '@/actions';
import BookCard from './BookCard';
import { Pagination } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import LoadingScreen from '@/app/loading';

function PaginationComponent () {
  const [newBooksRender, setNewBooksRender] = useAtom(booksForRenderAtom);
  const [totalBooks, setTotalBooks] = useAtom(totalBooksAtom);
  const [page, setPage] = useAtom(pageAtom);

  const pageSize = 10;

  const fetchBooks = async () => {
    const [data, total] = await Promise.all([getBooksPerPage(page, pageSize), countBooks()]);

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
    fetchBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClickNext = () => {
    setPage(prev => prev + 1);
  };

  const handleClickPrev = () => {
    setPage(prev => prev - 1);
  };

  const NewPaginationAntd = () => {
    return (
      <div className="w-full flex justify-center items-center my-4">
        <Pagination
          className="bg-purple-700 p-1 rounded-lg border border-purple-400"
          hideOnSinglePage
          itemRender={ (page, type) => {
            if (type === 'prev') {
              return <Link href={ `?page=${page - 1}` } className="text-white" onClick={ handleClickPrev }><ArrowLeftOutlined /></Link>;
            }
            if (type === 'next') {
              return <Link href={ `?page=${page + 1}` } className="text-white" onClick={ handleClickNext }><ArrowRightOutlined /></Link>;
            }
            return <Link href={ `?page=${page}` } onClick={ () => setPage(page) }>{ page }</Link>;
          } }
          current={ page }
          defaultCurrent={ 1 }
          pageSize={ pageSize }
          total={ totalBooks }
          onChange={ (page) => setPage(page) }
        />
      </div>
    );
  };

  return (
    <div>
      <NewPaginationAntd />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          newBooksRender.length ? newBooksRender.map((book) => (
            <BookCard
              key={ book.id }
              book={ book }
            />
          )) : <LoadingScreen />
        }
      </div>
      <NewPaginationAntd />
    </div>
  );
}

export default PaginationComponent;