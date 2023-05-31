import BookCard from '@/components/BookCard';
import React from 'react';
import { BookProps } from '@/types/Book';
import { getBookById, getBooks } from '@/actions';

async function DetailsBook({ params }: { params: { id: string } }) {
  const book = await getBookById(Number(params.id));

  return (
    <div>
      { book && <BookCard book={ book } /> }
    </div>
  );
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books?.map((book: BookProps) => ({...book, id: String(book.id)}));
}

export default DetailsBook;