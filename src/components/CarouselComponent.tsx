'use client';

import React from 'react';
import { Carousel } from 'antd';
import { useAtom } from 'jotai';
import { booksForRenderAtom } from '@/jotai/atoms';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function CarouselComponent () {
  const [newBooksRender, _setNewBooksRender] = useAtom(booksForRenderAtom);


  return (
    <div>
      <Carousel autoplay>
        {newBooksRender.map((book) => (
          <div key={ book?.name }>
            <h3 style={ contentStyle }>{book?.name}</h3>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;