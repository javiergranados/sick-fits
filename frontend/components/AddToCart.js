import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TO_CART } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';

const AddToCart = ({ id }) => {
  const [addToCart] = useMutation(ADD_TO_CART, {
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
    <button type="button" onClick={handleClick}>
      Add To Cart 🛒
    </button>
  );
};

export default AddToCart;
