import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import Order from '../components/Order';
import { SINGLE_ORDER } from '../graphql/query';
import { fakeOrder } from '../utils/testUtils';

const mocks = [
  {
    request: { query: SINGLE_ORDER, variables: { id: 'ord123' } },
    result: { data: { order: fakeOrder() } },
  },
];

describe('<Order />', () => {
  it('renders the order', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="ord123" />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    const order = wrapper.find('div[data-test="order"]');

    expect(toJSON(order)).toMatchSnapshot();
  });
});
