import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';
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
    <S.Pagination data-test="pagination">
      <Head>
        <title>
          Sick fits! | Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ⬅ Prev
        </a>
      </Link>
      <p>
        Page {page} of <span className="totalPages">{pages}</span>
      </p>
      <p>{count} Items Total</p>
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 },
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next ➡
        </a>
      </Link>
    </S.Pagination>
  );
};

export default Pagination;
