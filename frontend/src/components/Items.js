import { useQuery } from '@apollo/react-hooks';
import * as S from './styles/Items';
import Item from './Item';
import { GET_ITEMS } from '../graphql/query';

const Items = () => {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>{`Error: ${{ error }}`}</p>;

  return (
    <S.ItemsList>
      {data.items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </S.ItemsList>
  );
};

export default Items;
