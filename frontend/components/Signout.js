import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER } from '../graphql/query';
import { SIGN_OUT } from '../graphql/mutation';

export default () => {
  const [signOut] = useMutation(SIGN_OUT, { refetchQueries: [{ query: CURRENT_USER }] });

  return (
    <button type="button" onClick={signOut}>
      Sign out
    </button>
  );
};
