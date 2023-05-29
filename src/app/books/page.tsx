import RegisterBookForm from '@/components/RegisterBookForm';
import { api } from '@/lib/api';

async function books() {
  const { data } = await api.get('/author');
  return (
    <div>
      <RegisterBookForm authors={ data } />
    </div>
  );
}

export default books;