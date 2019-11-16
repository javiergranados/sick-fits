import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as S from './styles/Items';
import Item from './Item';

const GET_ITEMS = gql`
  {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

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
