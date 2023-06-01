'use client';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="max-sm:hidden">
      <div className="w-full flex h-28 bg-purple-700 p-3">
        <nav className="w-full items-center justify-center flex gap-3 text-white">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/dashboard/books/edit" className="hover:text-green-400">Editar Livro</Link>
          <Link href="/dashboard/books" className="hover:text-green-400">Cadastrar Livro</Link>
          <Link href="/dashboard/authors" className="hover:text-green-400">Cadastrar Autor</Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;