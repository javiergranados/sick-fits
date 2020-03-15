import { useQuery } from '@apollo/react-hooks';
import Error from './Error';
import { GET_ITEM } from '../graphql/query';

const SingleItem = ({ id }) => {
  const { loading, data, error } = useQuery(GET_ITEM, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  return <p>Single item component for ID {id}</p>;
};

export default SingleItem;
