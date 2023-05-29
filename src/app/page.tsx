import CarouselComponent from '@/components/CarouselComponent';
import PaginationComponent from '@/components/PaginationComponent';
import { api } from '@/lib/api';
import { BookProps } from '@/types/Book';
import { AxiosResponse } from 'axios';
import React from 'react';

export default async function Home(): Promise<React.JSX.Element> {
  
  return (
    <div>
      <h1>Hello, Agro Tech!</h1>
      <CarouselComponent />
      <PaginationComponent />
    </div>
  );
}
