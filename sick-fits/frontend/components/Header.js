import Head from 'next/head';

const Header = () => {
  return (
    <Head>
      <div className="bar">
        <a href="/">Sick Fits</a>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </Head>
  );
};

export default Header;
