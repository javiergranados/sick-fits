import PropTypes from 'prop-types';
import formatMoney from '../utils/formatMoney';
import RemoveFromCart from './RemoveFromCart';
import * as S from './styles/CartItem';

const CartItem = ({ cartItem }) => {
  if (!cartItem.item) {
    return (
      <S.CartItem>
        <p>This Item has been removed</p>
        <RemoveFromCart id={cartItem.id} />
      </S.CartItem>
    );
  }

  return (
    <S.CartItem>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}&nbsp;→&nbsp;
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </S.CartItem>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
