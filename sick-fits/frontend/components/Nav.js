import Link from 'next/link';

const Nav = () => (
  <>
    <Link href="/">
      <a>
        <p>Go to home page</p>
      </a>
    </Link>
    <Link href="/sell">
      <a>
        <p>Go to sell page</p>
      </a>
    </Link>
  </>
);

export default Nav;
