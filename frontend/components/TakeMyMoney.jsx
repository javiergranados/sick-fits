import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import StripeCheckout from 'react-stripe-checkout';
import User from './User';
import { CREATE_ORDER } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';
import calcTotalPrice from '../utils/calcTotalPrice';
import totalItems from '../utils/totalItems';

const publicKey =
  'pk_test_51HIWY9BLGmaX55y0X0luZw22F8iv6448gyDQMad7pznmWFpjr0F2MYs7JPpklPoQBHGXMVrzszc4kKxRRyk1Kp0W00Tn2SzPfu';

const TakeMyMoney = ({ children }) => {
  const [createOrder] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const onToken = async res => {
    try {
      const { data } = await createOrder({ variables: { token: res.id } });
      console.log('data', data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <User>
      {({ me }) => {
        if (!me) {
          return children;
        }
        return (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey={publicKey}
            currency="EUR"
            locale="it"
            email={me.email}
            token={res => onToken(res)}
            bitcoin
          >
            {children}
          </StripeCheckout>
        );
      }}
    </User>
  );
};

export default TakeMyMoney;
