import OrderList from '../components/OrderList';
import PleaseSignIn from '../components/PleaseSignIn';

const OrdersPage = () => (
  <PleaseSignIn>
    <OrderList />
  </PleaseSignIn>
);

export default OrdersPage;
