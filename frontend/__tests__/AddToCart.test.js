import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloConsumer } from 'react-apollo';
import { act } from 'react-dom/test-utils';
import AddToCart from '../components/AddToCart';
import { CURRENT_USER } from '../graphql/query';
import { ADD_TO_CART } from '../graphql/mutation';
import { fakeUser, fakeCartItem } from '../utils/testUtils';

const mocks = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [],
        },
      },
    },
  },
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        },
      },
    },
  },
  {
    request: { query: ADD_TO_CART, variables: { id: 'abc123' } },
    result: {
      data: {
        addToCart: {
          ...fakeCartItem(),
          quantity: 1,
        },
      },
    },
  },
];

describe('<AddToCart />', () => {
  it('renders and matches the snap shot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });

  it('adds an item to cart when clicked', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart id="abc123" />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    const {
      data: { me },
    } = await apolloClient.query({ query: CURRENT_USER });

    expect(me.cart).toHaveLength(0);

    // add an item to the cart
    wrapper.find('button').simulate('click');
    await act(wait);

    // check if the item is in the cart
    const {
      data: { me: me2 },
    } = await apolloClient.query({ query: CURRENT_USER });

    expect(me2.cart).toHaveLength(1);
    expect(me2.cart[0].id).toBe('omg123');
    expect(me2.cart[0].quantity).toBe(3);
  });

  it('changes from add to adding when clicked', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    expect(wrapper.text()).toContain('Add To Cart');

    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Adding To Cart');
  });
});
