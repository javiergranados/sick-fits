import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TO_CART } from '../graphql/mutation';

const AddToCart = ({ id }) => {
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleClick = async () => {
    try {
      const { data } = await addToCart({ variables: { id } });
      console.log('data', data);
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
