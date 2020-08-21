import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import User from './User';
import CartItem from './CartItem';
import TakeMyMoney from './TakeMyMoney';
import { GET_LOCAL_STATE } from '../graphql/query';
import { TOGGLE_CART } from '../graphql/mutation';
import { Supreme } from './styles/Supreme';
import { CloseButton } from './styles/CloseButton';
import { SickButton } from './styles/SickButton';
import calcTotalPrice from '../utils/calcTotalPrice';
import * as S from './styles/Cart';
import formatMoney from '../utils/formatMoney';

const Cart = () => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const [toggleCart] = useMutation(TOGGLE_CART);

  return (
    <User>
      {({ me }) => {
        if (!me) {
          return null;
        }
        return (
          <S.Cart open={data.cartOpen}>
            <header>
              <CloseButton title="close" onClick={toggleCart}>
                &times;
              </CloseButton>
              <Supreme>{me.name}'s cart</Supreme>
              <p>
                You Have {me.cart.length} Item{me.cart.length > 1 && 's'} in your cart.
              </p>
            </header>
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
              <TakeMyMoney>
                <SickButton>Checkout</SickButton>
              </TakeMyMoney>
            </footer>
          </S.Cart>
        );
      }}
    </User>
  );
};

export default Cart;
