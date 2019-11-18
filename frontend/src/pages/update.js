import { useRouter } from 'next/router';
import UpdateItem from '../components/UpdateItem';

const Update = () => {
  const router = useRouter();
  if (!router) return false;
  return <UpdateItem id={router.query.id} />;
};

export default Update;
