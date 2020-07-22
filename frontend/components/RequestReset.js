import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import * as S from './styles/Form';
import Error from './Error';
import { REQUEST_RESET } from '../graphql/mutation';

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const [requestReset, { loading, error, called }] = useMutation(REQUEST_RESET);

  const handleChange = ({ target }) => setEmail(target.value);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await requestReset({ variables: { email } });
      setEmail('');
    } catch (err) {
      // do nothing
    }
  };

  return (
    <S.Form method="post" onSubmit={handleSubmit}>
      <Error error={error} />
      {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset</h2>
        <label htmlFor="email">
          Email <input type="email" name="email" placeholder="email" value={email} onChange={handleChange} />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </S.Form>
  );
};

export default RequestReset;
