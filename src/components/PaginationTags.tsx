import { Pagination } from 'antd';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { pageAtom, totalBooksAtom } from '@/jotai/atoms';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const PaginationTags = ({ pageSize }: { pageSize: number }) => {
  const [totalBooks] = useAtom(totalBooksAtom);
  const [page, setPage] = useAtom(pageAtom);

  const handleClickNext = () => {
    setPage(prev => prev + 1);
  };

  const handleClickPrev = () => {
    setPage(prev => prev - 1);
  };

  return (
    <div className="w-full flex justify-center items-center my-4">
      <Pagination
        className="bg-purple-700 p-1 rounded-lg border border-purple-400"
        // hideOnSinglePage
        itemRender={ (page, type) => {
          if (type === 'prev') {
            return <Link href={ `?page=${page - 1}` } className="text-white" onClick={ handleClickPrev }><ArrowLeftOutlined /></Link>;
          }
          if (type === 'next') {
            return <Link href={ `?page=${page + 1}` } className="text-white" onClick={ handleClickNext }><ArrowRightOutlined /></Link>;
          }
          return <Link href={ `?page=${page}` } onClick={ () => setPage(page) }>{ page }</Link>;
        } }
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