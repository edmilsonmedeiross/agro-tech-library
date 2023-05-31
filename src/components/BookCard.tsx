'use client';
import React from 'react';
import { BookProps } from '@/types/Book';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { isVisibleEditModalAtom } from '@/jotai/atoms';
import { api } from '@/lib/api';


export interface BookCardProps extends BookProps {
  author_fk: {
    id: number;
    bio: string;
    birthDate: string;
    name: string;
  };
  categories: {
    id: string;
    name?: string;
  }[];
}

function BookCard({book}: {book: BookCardProps}) {
  const [isVisible, setIsVisible] = useAtom(isVisibleEditModalAtom);

  const {
    id,
    name,
    description,
    thumbnail,
    releaseDate,
    author_fk: { name: authorName }
  } = book;
  
  const date = releaseDate ? format(new Date(releaseDate), 'dd-MM-yyyy') : '';

  const handleDeleteButton = async () => {
    setIsVisible(true);
  };

  const handleDeleteModal = async () => {
    await api.delete(`/books/${id}`);
  };

  return (
    <div className="flex flex-col items-center my-3 gap-3">
      { isVisible && (
        <div className="fixed top-0 left-0 w-full z-10 h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md flex flex-col gap-2 p-3">
            <h1 className="text-2xl font-bold">Tem certeza que deseja deletar o livro?</h1>
            <div className="flex gap-2">
              <button onClick={ handleDeleteModal } className="bg-red-500 text-white rounded-md px-3 py-1">Sim</button>
              <button onClick={ () => { setIsVisible(false); } } className="bg-green-500 text-white rounded-md px-3 py-1">Não</button>
            </div>
          </div>
        </div>
      ) }
      
      <div>
        <h4>{name}</h4>
        <Image src={ thumbnail } alt={ name } width={ 240 } height={ 240 } />
        <p>Data de lançamento: {date}</p>
        <p>Autor: {authorName}</p>
        <p>Descrição: {description}</p>
      </div>
     
      <Link className="self-center text-center w-[240px] bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded hover:transition-colors duration-300" href={ `/dashboard/books/edit/${ book.id }` }>Editar</Link>
      <button className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded w-[240px] hover:transition-colors duration-300" onClick={ handleDeleteButton }>Deletar Livro</button>

    </div>
  );
}

export default BookCard;