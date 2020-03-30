import { useMutation } from '@apollo/react-hooks';

import { useState } from 'react';
import * as S from './styles/Form';
import Error from './Error';
import { SIGN_UP } from '../graphql/mutation';

const Signup = () => {
  const [values, setValues] = useState({ email: '', name: '', password: '' });

  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  const handleChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value });

  const handleSubmit = async event => {
    event.preventDefault();
    const { data } = await signUp({ variables: values });
    setValues({ email: '', name: '', password: '' });
    console.log('data', data);
  };

  return (
    <S.Form method="post" onSubmit={handleSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up for an Account</h2>
        <label htmlFor="email">
          Email <input type="email" name="email" placeholder="email" value={values.email} onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name <input type="text" name="name" placeholder="name" value={values.name} onChange={handleChange} />
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </S.Form>
  );
};

export default Signup;
