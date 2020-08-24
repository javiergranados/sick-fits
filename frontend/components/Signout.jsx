import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER } from '../graphql/query';
import { SIGN_OUT } from '../graphql/mutation';

const Signout = () => {
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT, { refetchQueries: [{ query: CURRENT_USER }] });

  const handleClick = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (err) {
      // do nothing
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Sign out
    </button>
  );
};

export default Signout;
