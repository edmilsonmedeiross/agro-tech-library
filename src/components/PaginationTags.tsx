import { Pagination } from 'antd';
import { useAtom } from 'jotai';
import { pageAtom, totalBooksAtom } from '@/jotai/atoms';
import ItemRenderPagination from './ItemRenderPagination';

const PaginationTags = ({ pageSize }: { pageSize: number }) => {
  const [totalBooks] = useAtom(totalBooksAtom);
  const [page, setPage] = useAtom(pageAtom);

  return (
    <div className="w-full flex justify-center items-center my-4">
      <Pagination
        className="bg-purple-700 p-1 rounded-lg border border-purple-400"
        itemRender={ (currentPage, type) => <ItemRenderPagination page={ currentPage } type={ type } /> }
        current={ page }
        defaultCurrent={ 1 }
        pageSize={ pageSize }
        total={ totalBooks }
        onChange={ (page) => setPage(page) }
      />
    </div>
  );
};

export default PaginationTags;