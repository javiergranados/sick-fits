import Link from 'next/link';
import User from './User';
import Signout from './Signout';
import * as S from './styles/Nav';

const Nav = () => (
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

export default Nav;
