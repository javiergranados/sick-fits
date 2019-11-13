import Link from 'next/link';

const Nav = () => (
  <>
    <Link href="/">
      <a>Go to home page</a>
    </Link>
    <Link href="/sell">
      <a>Go to sell page</a>
    </Link>
  </>
);

export default Nav;
