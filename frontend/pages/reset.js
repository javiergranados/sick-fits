import { useRouter } from 'next/router';
import Reset from '../components/Reset';

const ResetPage = () => {
  const router = useRouter();
  const resetToken = (router && router.query && router.query.resetToken) || '';
  return <Reset resetToken={resetToken} />;
};

export default ResetPage;
