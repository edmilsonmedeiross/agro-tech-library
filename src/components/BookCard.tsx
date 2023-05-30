'use client';
import React from 'react';
import { Card } from 'antd';
import { BookProps } from '@/types/Book';
import { format } from 'date-fns';

const { Meta } = Card;

export interface BookCardProps extends BookProps {
  author_fk: {
    _bio: string;
    _birthDate: string;
    name: string;
  };
  categories: BookProps[];
}

function BookCard({book}: {book: BookCardProps}) {
  const {
    name,
    description,
    thumbnail,
    releaseDate,
    author_fk: { _bio, _birthDate, name: authorName }
  } = book;
  
  const date = releaseDate ? format(new Date(releaseDate), 'dd-MM-yyyy') : '';

  return (
    <div className="w-full flex flex-col items-center my-3">
      <Card
        hoverable
        style={ { width: 240 } }
        cover={ <img alt={ name } src={ thumbnail } /> }
      >
        <Meta title="Nome do Livro" description={ name } />
        <Meta title="Descrição" description={ description } />
        <Meta title="Data de Lançamento" description={ date } />
        <Meta title="Autor" description={ authorName } />
        {book.categories.map((category: BookProps) => (
          <Meta title="Categoria" key={ category.name } description={ category.name } />
        ))}
      </Card>
    </div>
  );
}

export default BookCard;