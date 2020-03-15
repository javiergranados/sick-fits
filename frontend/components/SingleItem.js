import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Error from './Error';
import * as S from './styles/SingleItem';

import { GET_ITEM } from '../graphql/query';

const SingleItem = ({ id }) => {
  const { loading, data, error } = useQuery(GET_ITEM, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  const { item } = data;
  return (
    <S.SingleItem>
      <Head>
        <title>Sick Fits | {item.title}</title>
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </S.SingleItem>
  );
};

export default SingleItem;
