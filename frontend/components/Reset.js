import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './styles/Form';
import Error from './Error';
import { RESET_PASSWORD } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';

const Reset = ({ resetToken }) => {
  const router = useRouter();
  const [values, setValues] = useState({ password: '', confirmPassword: '' });

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const handleChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await resetPassword({ variables: { ...values, resetToken } });
      setValues({ password: '', confirmPassword: '' });
      router.push('/');
    } catch (err) {
      // do nothing
    }
  };

  return (
    <S.Form method="post" onSubmit={handleSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your Password</h2>
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
        <label htmlFor="confirmPassword">
          Confirm Your Password{' '}
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset Your Password!</button>
      </fieldset>
    </S.Form>
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
