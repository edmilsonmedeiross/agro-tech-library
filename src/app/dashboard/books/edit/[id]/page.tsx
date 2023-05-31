import { getAuthors, getBookById, getCategories } from '@/actions';
import SearchBook from '@/components/SearchBook';
import React from 'react';

async function EditBookId({ params }: { params: { id: string }}) {
  const [book, authors, categoriesOpitions] = await Promise.all([
    getBookById(Number(params.id)),
    getAuthors(),
    getCategories(),
  ]);

  return (
    <div>
      <SearchBook
        book={ book }
        authors={ authors }
        categoriesOpitions={ categoriesOpitions }
        context={ 'edit' }
      />
    </div>
  );
}

export default EditBookId;