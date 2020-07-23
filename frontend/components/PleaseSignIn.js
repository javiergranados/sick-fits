import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../graphql/query';
import Signin from './Signin';

const PleaseSignIn = ({ children }) => {
  const { data, loading, error } = useQuery(CURRENT_USER, { fetchPolicy: 'network-only' });

  if (loading) return <p>Loading...</p>;
  if (!error && !data.me) {
    return (
      <div>
        <p>Please Sign In before Continuing</p>
        <Signin />
      </div>
    );
  }
  return children;
};

export default PleaseSignIn;
