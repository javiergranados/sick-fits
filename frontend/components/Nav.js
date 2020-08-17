import { useCallback } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART } from '../graphql/mutation';
import * as S from './styles/Nav';

const Nav = () => {
  const [toggleCart] = useMutation(TOGGLE_CART);
  const handleClick = useCallback(toggleCart, []);

  return (
    <User>
      {data => (
        <S.Nav>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {data && data.me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout />
              <button type="button" onClick={handleClick}>
                My Cart
              </button>
            </>
          )}
          {(!data || !data.me) && (
            <Link href="/signup">
              <a>Sign in</a>
            </Link>
          )}
        </S.Nav>
      )}
    </User>
  );
};

export default Nav;
