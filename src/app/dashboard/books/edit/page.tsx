import { getBooks, getAuthors, getCategories } from '@/actions';
import SearchBook from '@/components/SearchBook';
import React from 'react';

async function EditBook() {
  const [books, authors, categories] = await Promise.all([getBooks(), getAuthors(), getCategories()]);

  return (
    <>
      <h2 className="text-white text-2xl font-bold self-center">Edite um Livro!</h2>
      <SearchBook
        books={ books }
        authors={ authors }
        categoriesOpitions={ categories }
        context={ 'edit' }
      />
    </>
  );
}

export default EditBook;