import { getAuthors, getLimitedBooks } from '@/actions';
import CarouselComponent from '@/components/CarouselComponent';
import FilterBooksPerAuthor from '@/components/FilterBooksPerAuthor';
import PaginationComponent from '@/components/PaginationComponent';
import React from 'react';

export default async function Home(): Promise<React.JSX.Element> {
  const [authors, carouselBooks] = await Promise.all([getAuthors(), getLimitedBooks(10)]);
  
  return (
    <div className="flex flex-col bg-green-600 min-h-screen">
      <h1>Agro Tech Library!</h1>
      <FilterBooksPerAuthor authors={ authors } />
      <CarouselComponent renderBooks={ carouselBooks } />
      <PaginationComponent />
    </div>
  );
}
