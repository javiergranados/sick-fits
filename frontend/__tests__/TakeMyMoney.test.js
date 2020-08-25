import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import TakeMyMoney from '../components/TakeMyMoney';
import { fakeUser, fakeCartItem } from '../utils/testUtils';
import { CURRENT_USER } from '../graphql/query';

const mocks = [
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
];

describe('<TakeMyMoney />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    const checkout = wrapper.find('ReactStripeCheckout');

    expect(toJSON(checkout)).toMatchSnapshot();
    expect(checkout.text()).toEqual('Pay With Card');
  });
});
