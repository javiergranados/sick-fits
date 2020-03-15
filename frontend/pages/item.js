import { useRouter } from 'next/router';
import SingleItem from '../components/SingleItem';

const Item = () => {
  const router = useRouter();

  if (!router) return null;
  return <SingleItem id={router.query.id} />;
};

export default Item;
