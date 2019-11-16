import Link from 'next/link';
import Nav from './Nav';
import * as S from './styles/Header';

const Header = () => {
  return (
    <S.Header>
      <div className="bar">
        <S.Logo>
          <Link href="/">
            <a>Sick Fits!</a>
          </Link>
        </S.Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </S.Header>
  );
};

export default Header;
