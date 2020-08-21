import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as S from './styles/CartCount';

const CartCount = ({ count }) => (
  <S.AnimationStyles>
    <TransitionGroup>
      <CSSTransition unmountOnExit className="count" classNames="count" key={count} timeout={{ enter: 400, exit: 400 }}>
        <S.Dot>{count}</S.Dot>
      </CSSTransition>
    </TransitionGroup>
  </S.AnimationStyles>
);

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CartCount;
