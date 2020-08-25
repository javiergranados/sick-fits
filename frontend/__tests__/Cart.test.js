import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import Cart from '../components/Cart';
import { CURRENT_USER, GET_LOCAL_STATE } from '../graphql/query';
import { fakeUser, fakeCartItem } from '../utils/testUtils';

const user = fakeUser();

const mocks = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        me: {
          ...user,
          cart: [fakeCartItem()],
        },
      },
    },
  },
  {
    request: { query: GET_LOCAL_STATE },
    result: { data: { cartOpen: true } },
  },
];

describe('<Cart />', () => {
  it.skip('renders and matches snappy', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} client={{}}>
        <Cart />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    expect(toJSON(wrapper.find('header'))).toMatchSnapshot();
    expect(wrapper.find('ul').children()).toHaveLength(1);
  });
});
