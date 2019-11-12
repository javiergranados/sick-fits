import Header from './Header';

const Page = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Page;
