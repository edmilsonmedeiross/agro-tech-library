import CarouselComponent from '@/components/CarouselComponent';
import PaginationComponent from '@/components/PaginationComponent';
import React from 'react';

export default async function Home(): Promise<React.JSX.Element> {
  
  return (
    <div className="flex flex-col bg-purple-900 w-screen min-h-screen">
      <h1>Hello, Agro Tech!</h1>
      <CarouselComponent />
      <PaginationComponent />
    </div>
  );
}
