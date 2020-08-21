import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { GET_ALL_ORDERS } from '../graphql/query';
import Error from './Error';
import formatMoney from '../utils/formatMoney';
import * as S from './styles/OrderList';

const OrderList = () => {
  const { data, loading, error } = useQuery(GET_ALL_ORDERS);

  if (error) {
    return <Error error={error} />;
  }
  if (!data || loading) {
    return <p>Loading...</p>;
  }

  const { orders } = data;
  return (
    <>
      <h2>You have {orders.length} orders</h2>
      <S.OrderUl>
        {orders.map(order => (
          <S.OrderItemStyles key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id },
              }}
            >
              <a>
                <div className="order-meta">
                  <p>{order.items.reduce((prev, next) => prev + next.quantity, 0)} Items</p>
                  <p>{order.items.length} Products</p>
                  <p>{formatDistance(new Date(order.createdAt), new Date())}</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map(item => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
              </a>
            </Link>
          </S.OrderItemStyles>
        ))}
      </S.OrderUl>
    </>
  );
};

export default OrderList;
