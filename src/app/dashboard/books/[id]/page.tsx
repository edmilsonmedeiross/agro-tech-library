import BookCard from '@/components/BookCard';
import React from 'react';
import { api } from '@/lib/api';
import { BookProps } from '@/types/Book';

async function DetailsBook({ params }: { params: { id: string } }) {
  const book = await api.get(`/books/${params.id}`);

  return (
    <div>
      <BookCard book={ book.data } />
    </div>
  );
}

export async function generateStaticParams() {
  return (await api.get('/books')).data.map((book: BookProps) => ({...book, id: String(book.id)}));
}

export default DetailsBook;