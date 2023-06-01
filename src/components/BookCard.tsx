'use client';
import React from 'react';
import { BookProps } from '@/types/Book';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { isVisibleEditModalAtom } from '@/jotai/atoms';
import { api } from '@/lib/api';
import { usePathname, useRouter } from 'next/navigation';

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
    value?: string;
  }[];
}

function BookCard({book}: {book: BookCardProps}) {
  const [isVisible, setIsVisible] = useAtom(isVisibleEditModalAtom);
  const pathname = usePathname();
  const router = useRouter();

  const {
    id,
    name,
    description,
    thumbnail,
    releaseDate,
    author_fk: { name: authorName },
    categories,
  } = book;

  const date = releaseDate ? format(new Date(releaseDate), 'dd/MM/yyyy') : '';

  const handleDeleteButton = async () => {
    setIsVisible(true);
  };

  const handleDeleteModal = async () => {
    await api.delete(`/books/${id}`);
    setIsVisible(false);
    router.push('/dashboard/books');
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
      
      <a
        href={ `/dashboard/books/${id}` }
        className={ `flex flex-col bg-slate-100 ${pathname === '/' && 'hover:bg-purple-200 transition-all duration-300'} rounded-md p-4 gap-2 max-w-[300px] min-h-[630px] max-h-fit` }
      >
        <h4 className="self-center text-purple-900 font-medium text-xl capitalize">{name}</h4>
        <Image
          className="w-full h-[400px] rounded-md"
          src={ thumbnail }
          alt={ name }
          width={ 200 }
          height={ 400 }
          priority
        />
        <div className="bg-slate-300 rounded-md p-2 flex-grow">
          {pathname !== '/' && (
            <>
              <p className="text-purple-900 font-medium whitespace-normal break-words">
                <span className="font-bold italic">Autor: </span>
                {authorName}
              </p>
              <p className="text-purple-900 font-medium whitespace-normal break-words">
                <span className="font-bold italic">Data de lançamento: </span>
                {date}
              </p>
            </>
          )}
          <p className="text-purple-900 font-medium whitespace-normal break-words">
            <span className="font-bold italic">Descrição:</span> {
            pathname === '/' ? (
              description.slice(0, 120)) : description }{description.length > 120 && pathname === '/' ? '...' : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={ category.id } className={ `bg-${category?.value}-500 text-black rounded-md px-3 py-1` }>
              {category.name}
            </span>
          ))}
        </div>
      </a>
      {(!pathname.includes('edit') && pathname !== '/') && (
        <>
          <Link className="self-center text-center w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded hover:transition-colors duration-300" href={ `/dashboard/books/edit/${ book.id }` }>Editar Livro</Link>
          <button className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded w-full hover:transition-colors duration-300" onClick={ handleDeleteButton }>Deletar Livro</button>
        </>
      )}
    </div>
  );
}

export default BookCard;