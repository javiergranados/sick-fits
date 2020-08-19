import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { REMOVE_FROM_CART } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';
import * as S from './styles/RemoveFromCart';

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const handleClick = () => {
    try {
      removeFromCart({ variables: { id } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <S.RemoveFromCart title="Delete Item" type="button" disabled={loading} onClick={handleClick}>
      &times;
    </S.RemoveFromCart>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
