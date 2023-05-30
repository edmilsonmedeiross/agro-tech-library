'use client';

import React from 'react';
import { Carousel } from 'antd';
import { useAtom } from 'jotai';
import { booksForRenderAtom } from '@/jotai/atoms';
import Link from 'next/link';

const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#13111c',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#059666',
};

function CarouselComponent () {
  const [newBooksRender, _setNewBooksRender] = useAtom(booksForRenderAtom);


  return (
    <div>
      <Carousel autoplay>
        {newBooksRender.map((book) => (
          <Link key={ book?.name } href={ `/dashboard/books/${book.id}` }>
            <div>
              <h1 style={ contentStyle }>{book?.name}</h1>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;