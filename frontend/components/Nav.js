import Link from 'next/link';
import User from './User';
import * as S from './styles/Nav';

const Nav = () => (
  <S.Nav>
    <User>
      {data => {
        return (
          (data && data.me && (
            <Link href="/me">
              <a>{data.me.name}</a>
            </Link>
          )) ||
          null
        );
      }}
    </User>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
  </S.Nav>
);

export default Nav;
