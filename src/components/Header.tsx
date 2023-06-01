'use client';
import { BookFilled, EditFilled, HomeFilled, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="max-sm:hidden">
      <div className="w-full flex h-28 bg-purple-700 p-3">
        <nav className="w-full items-center justify-center flex gap-3 text-white">
          <Link href="/" className="hover:text-green-400 flex items-center justify-center gap-1 text-lg"><HomeFilled />Home</Link>
          <Link href="/dashboard/books/edit" className="hover:text-green-400 flex items-center justify-center gap-1 text-lg"><EditFilled />Editar Livro</Link>
          <Link href="/dashboard/books" className="hover:text-green-400 flex items-center justify-center gap-1 text-lg"><BookFilled />Cadastrar Livro</Link>
          <Link href="/dashboard/authors" className="hover:text-green-400 flex items-center justify-center gap-1 text-lg"><UserAddOutlined />Cadastrar Autor</Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;