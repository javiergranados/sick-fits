import Header from './Header';
import Meta from './Meta';

const Page = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      {children}
    </>
  );
};

export default Page;
