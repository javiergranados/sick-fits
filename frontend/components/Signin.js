import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import * as S from './styles/Form';
import Error from './Error';
import { SIGN_IN } from '../graphql/mutation';

const Signin = () => {
  const [values, setValues] = useState({ email: '', password: '' });

  const [signIn, { loading, error }] = useMutation(SIGN_IN);

  const handleChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value });

  const handleSubmit = async event => {
    event.preventDefault();
    await signIn({ variables: values });
    setValues({ email: '', password: '' });
  };

  return (
    <S.Form method="post" onSubmit={handleSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account</h2>
        <label htmlFor="email">
          Email <input type="email" name="email" placeholder="email" value={values.email} onChange={handleChange} />
        </label>
        <label htmlFor="password">
          Password{' '}
          <input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </S.Form>
  );
};

export default Signin;
