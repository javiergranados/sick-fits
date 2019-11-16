import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles/Error';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map(({ message }, i) => (
      <S.Error key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {message.replace('GraphQL error: ', '')}
        </p>
      </S.Error>
    ));
  }
  return (
    <S.Error>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </S.Error>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
