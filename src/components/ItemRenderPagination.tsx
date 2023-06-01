import { pageAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

type ItemType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

const ItemRenderPagination = ({page, type}: { page: number, type: ItemType }) => {
  const [, setPage] = useAtom(pageAtom);

  const handleClickNext = () => {
    setPage(prev => prev + 1);
  };

  const handleClickPrev = () => {
    setPage(prev => prev - 1);
  };

  if (type === 'prev') {
    return <Link href={ `?page=${page - 1}` } className="text-white" onClick={ handleClickPrev }><ArrowLeftOutlined /></Link>;
  }
  if (type === 'next') {
    return <Link href={ `?page=${page + 1}` } className="text-white" onClick={ handleClickNext }><ArrowRightOutlined /></Link>;
  }
  return <Link href={ `?page=${page}` } onClick={ () => setPage(page) }>{ page }</Link>;
};

export default ItemRenderPagination;