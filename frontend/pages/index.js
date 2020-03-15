import { useRouter } from 'next/router';
import Items from '../components/Items';

const Home = () => {
  const router = useRouter();
  const page = (router && router.query && router.query.page) || 1;
  return <Items page={parseFloat(page)} />;
};

export default Home;
