import Link from 'next/link';

const Home = () => {
  return (
    <>
      <p>You're in home page</p>
      <Link href="/sell">
        <a>Go to sell page</a>
      </Link>
    </>
  );
};

export default Home;
