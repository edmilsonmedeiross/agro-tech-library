'use client';
import { useAtom } from 'jotai';
import { CloseOutlined, BarsOutlined } from '@ant-design/icons';
import { isMobileMenuOpenAtom } from '@/jotai/atoms';
import Link from 'next/link';

function MenuMobile() {
  const [isOpen, setIsOpen] = useAtom(isMobileMenuOpenAtom);

  return (
    <div>
      <span className="bg-purple-800 rounded-full">
        {
          isOpen
          ?
            <CloseOutlined
              className="sm:hidden z-50 fixed top-2 right-2 text-white text-xl cursor-pointer font-bold"
              onClick={ () => setIsOpen(!isOpen) }
            />
          :
            <BarsOutlined
              className="sm:hidden z-50 fixed top-2 right-2 text-white text-xl cursor-pointer font-bold"
              onClick={ () => setIsOpen(!isOpen) }
            />
        }
      </span>
      {isOpen &&
      <div className="z-40 h-screen fixed overflow-y-hidden top-0 w-full bg-purple-950 transform translate-x-0 transition-transform ease-in-out duration-500">
        <nav className="w-full h-screen items-center justify-center flex flex-col gap-3 text-white">
          <Link href="/" className="hover:text-green-400" onClick={ () => setIsOpen(!isOpen) }>Home</Link>
          <Link href="/dashboard/books/edit" className="hover:text-green-400" onClick={ () => setIsOpen(!isOpen) }>Editar Livro</Link>
          <Link href="/dashboard/books" className="hover:text-green-400" onClick={ () => setIsOpen(!isOpen) }>Cadastrar Livro</Link>
          <Link href="/dashboard/authors" className="hover:text-green-400" onClick={ () => setIsOpen(!isOpen) }>Cadastrar Autor</Link>
        </nav>
      </div>}
    </div>
  );
}

export default MenuMobile;

