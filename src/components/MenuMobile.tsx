'use client';
import { useAtom } from 'jotai';
import { CloseOutlined, BarsOutlined, HomeFilled, EditFilled, BookFilled, UserAddOutlined } from '@ant-design/icons';
import { isMobileMenuOpenAtom } from '@/jotai/atoms';
import Link from 'next/link';

function MenuMobile() {
  const [isOpen, setIsOpen] = useAtom(isMobileMenuOpenAtom);

  return (
    <div>
      {
        isOpen
        ?
          <CloseOutlined
            className="sm:hidden z-50 fixed top-2 right-2 text-white text-xl cursor-pointer font-bold bg-purple-800 rounded-md pt-1 p-2"
            onClick={ () => setIsOpen(!isOpen) }
          />
        :
          <BarsOutlined
            className="sm:hidden z-50 fixed top-2 right-2 text-white text-xl cursor-pointer font-bold bg-purple-800 rounded-md pt-1 p-2"
            onClick={ () => setIsOpen(!isOpen) }
          />
      }
      {isOpen &&
      // <div className="z-40 h-screen fixed overflow-y-hidden top-0 w-full bg-purple-950 transform translate-x-0 transition-transform ease-in-out duration-400 shadow-2xl">
      <>
        <div className="z-10 bg-black bg-opacity-50 h-screen w-screen fixed"></div>
        <div className="z-40 fixed h-screen rounded-tl-full rounded-br-full w-full overflow-y-hidden top-0 bg-purple-950 flex justify-center animate-bubble-open">
          <nav className="w-fit items-start justify-center flex flex-col gap-3 text-white">
            <Link
              href="/"
              className="hover:text-green-400 flex items-center justify-center gap-2 text-xl"
              onClick={ () => setIsOpen(!isOpen) }
            >
              <HomeFilled />
              Home
            </Link>
            <Link
              href="/dashboard/books/edit"
              className="hover:text-green-400 flex items-center justify-center gap-2 text-xl"
              onClick={ () => setIsOpen(!isOpen) }
            >
              <EditFilled />
              Editar Livro
            </Link>
            <Link
              href="/dashboard/books"
              className="hover:text-green-400 flex items-center justify-center gap-2 text-xl"
              onClick={ () => setIsOpen(!isOpen) }
            >
              <BookFilled />
              Cadastrar Livro
            </Link>
            <Link
              href="/dashboard/authors"
              className="hover:text-green-400 flex items-center justify-center gap-2 text-xl"
              onClick={ () => setIsOpen(!isOpen) }
            >
              <UserAddOutlined />
              Cadastrar Autor
            </Link>
          </nav>
        </div>
        </>}
    </div>
  );
}

export default MenuMobile;

