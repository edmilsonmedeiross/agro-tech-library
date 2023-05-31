'use client';
import React from 'react';
import { Carousel } from 'antd';
import { useAtom } from 'jotai';
import { booksForRenderAtom } from '@/jotai/atoms';
import Image from 'next/image';
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
      <Carousel>
        {newBooksRender.map((book) => (
          <Link key={ book?.name } href={ `/dashboard/books/${book.id}` }>
            <div style={ contentStyle } className="relative bg-gradient-to-b from-transparent to-purple-500">
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold z-10 capitalize text-4xl text-white">{book?.name}</h1>
              <Image
                src={ book.thumbnail }
                alt={ `Livro ${book.name}` }
                className="w-full h-full"
                width={ 300 }
                height={ 400 }
                priority
              />

              {/* Div com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-b to-purple-500 from-transparent opacity-75" />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;