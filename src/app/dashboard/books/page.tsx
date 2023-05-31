import { getAuthors, getCategories } from '@/actions';
import RegisterBookForm from '@/components/RegisterBookForm';

async function Books() {
  const [categoriesOptions, authors] = await Promise.all([getCategories(), getAuthors()]);

  return (
    <>
      <h1 className="text-2xl text-white self-center font-bold">Cadastre um Livro!</h1>
      <RegisterBookForm
        authors={ authors }
        categoriesOptions={ categoriesOptions }
        context="register"
      />
    </>
  );
}

export default Books;