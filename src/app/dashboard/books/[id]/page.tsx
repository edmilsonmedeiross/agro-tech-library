import BookCard from '@/components/BookCard';
import React from 'react';
import { getBookById } from '@/actions';

async function DetailsBook({ params }: { params: { id: string } }) {
  const book = await getBookById(Number(params.id));

  return (
    <div>
      { book && <BookCard book={ book } /> }
    </div>
  );
}

export default DetailsBook;