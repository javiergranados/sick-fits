import { useQuery } from '@apollo/react-hooks';
import * as S from './styles/Items';
import Item from './Item';
import Pagination from './Pagination';
import { GET_ITEMS } from '../graphql/query';

const Items = ({ page }) => {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${{ error }}`}</p>;

  return (
    <>
      <Pagination page={page} />
      <S.ItemsList>
        {data.items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </S.ItemsList>
      <Pagination page={page} />
    </>
  );
};

export default Items;
