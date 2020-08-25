import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloConsumer } from 'react-apollo';
import { act } from 'react-dom/test-utils';
import RemoveFromCart from '../components/RemoveFromCart';
import { CURRENT_USER } from '../graphql/query';
import { REMOVE_FROM_CART } from '../graphql/mutation';
import { fakeUser, fakeCartItem } from '../utils/testUtils';

global.alert = console.log; //eslint-disable-line

const mocks = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: 'abc123' })],
        },
      },
    },
  },
  {
    request: { query: REMOVE_FROM_CART, variables: { id: 'abc123' } },
    result: {
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: 'abc123',
        },
      },
    },
  },
];

describe('<RemoveFromCart />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart id="abc123" />
      </MockedProvider>
    );

    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });

  it('removes the item from cart', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <RemoveFromCart id="abc123" />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    const res = await apolloClient.query({ query: CURRENT_USER });

    expect(res.data.me.cart).toHaveLength(1);
    expect(res.data.me.cart[0].item.price).toBe(5000);

    wrapper.find('button').simulate('click');
    await act(wait);

    const res2 = await apolloClient.query({ query: CURRENT_USER });
    expect(res2.data.me.cart).toHaveLength(0);
  });
});
