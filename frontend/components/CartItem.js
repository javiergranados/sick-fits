import React from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../utils/formatMoney';
import RemoveFromCart from './RemoveFromCart';
import * as S from './styles/CartItem';

const CartItem = ({ cartItem: { id, item, quantity } }) => {
  return (
    <S.CartItem>
      <img width="100" src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>
          {formatMoney(item.price * quantity)}&nbsp;→&nbsp;
          <em>
            {quantity} &times; {formatMoney(item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </S.CartItem>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
