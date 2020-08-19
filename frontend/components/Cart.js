import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCAL_STATE } from '../graphql/query';
import { TOGGLE_CART } from '../graphql/mutation';
import { Supreme } from './styles/Supreme';
import { CloseButton } from './styles/CloseButton';
import { SickButton } from './styles/SickButton';
import * as S from './styles/Cart';

const Cart = () => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const [toggleCart] = useMutation(TOGGLE_CART);

  return (
    <S.Cart open={data.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>
          &times;
        </CloseButton>
        <Supreme>Your cart</Supreme>
        <p>You Have __ Items in your cart.</p>
      </header>
      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </S.Cart>
  );
};

export default Cart;
