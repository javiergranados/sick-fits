import NProgress from 'nprogress';
import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import User from './User';
import { CREATE_ORDER } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';
import calcTotalPrice from '../utils/calcTotalPrice';
import totalItems from '../utils/totalItems';

const publicKey =
  'pk_test_51HIWY9BLGmaX55y0X0luZw22F8iv6448gyDQMad7pznmWFpjr0F2MYs7JPpklPoQBHGXMVrzszc4kKxRRyk1Kp0W00Tn2SzPfu';

const TakeMyMoney = ({ children }) => {
  const router = useRouter();
  const [createOrder] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const onToken = async res => {
    try {
      NProgress.start();
      const { data } = await createOrder({ variables: { token: res.id } });

      router.push({
        pathname: '/order',
        query: { id: data.createOrder.id },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <User>
      {({ me }, loading) => {
        if (!me || loading) {
          return null;
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
