import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TO_CART } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const handleClick = () => {
    try {
      addToCart({ variables: { id } });
    } catch (err) {
      // do nothing
    }
  };

  return (
    <button type="button" disabled={loading} onClick={handleClick}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};

export default AddToCart;
