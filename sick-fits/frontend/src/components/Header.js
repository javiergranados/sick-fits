import NProgress from 'nprogress';
import Router from 'next/router';
import Link from 'next/link';
import Nav from './Nav';
import * as S from './styles/Header';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
