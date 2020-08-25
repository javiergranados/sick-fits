import Order from '../components/Order';
import PleaseSignIn from '../components/PleaseSignIn';

const OrderPage = ({ id }) => (
  <PleaseSignIn>
    <Order id={id} />
  </PleaseSignIn>
);

OrderPage.getInitialProps = async ctx => {
  return { id: ctx.query.id };
};

export default OrderPage;
