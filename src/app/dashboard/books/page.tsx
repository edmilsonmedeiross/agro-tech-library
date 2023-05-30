import RegisterBookForm from '@/components/RegisterBookForm';
import { api } from '@/lib/api';
import { AuthorProps } from '@/types/Author';
import { AxiosResponse } from 'axios';

async function books() {
  const { data }: AxiosResponse<AuthorProps[]> = await api.get('/author');

  return (
    <>
      <h1 className="text-2xl text-white self-center font-bold">Cadastre um Livro!</h1>
      <RegisterBookForm authors={ data } context="reg" />
    </>
  );
}

export default books;