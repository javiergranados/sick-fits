import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import { PAGINATION } from '../graphql/query';
import Error from './Error';
import { perPage } from '../config';
import * as S from './styles/Pagination';

const Pagination = ({ page }) => {
  const { loading, error, data } = useQuery(PAGINATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / perPage);

  return (
    <S.Pagination>
      <Head>
        <title>
          Sick fits! | Page {page} of {pages}
        </title>
      </Head>
      <p>
        Page {page} of {pages}
      </p>
    </S.Pagination>
  );
};

export default Pagination;
