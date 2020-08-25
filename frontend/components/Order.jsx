import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import { format } from 'date-fns';
import { SINGLE_ORDER } from '../graphql/query';
import Error from './Error';
import formatMoney from '../utils/formatMoney';
import * as S from './styles/Order';

const Order = () => {
  const router = useRouter();
  const [getOrder, { data, loading, error }] = useLazyQuery(SINGLE_ORDER);

  useEffect(() => {
    getOrder({
      variables: { id: router ? router.query.id : null },
    });
  }, []);

  if (error) {
    return <Error error={error} />;
  }
  if (!data || loading) {
    return <p>Loading...</p>;
  }

  const { order } = data;
  return (
    <S.Order>
      <Head>
        <title>Sick Fits - Order {order.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Date</span>
        <span>{format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a')}</span>
      </p>
      <p>
        <span>Order Total</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map(item => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </S.Order>
  );
};

export default Order;
