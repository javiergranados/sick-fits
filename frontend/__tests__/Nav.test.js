import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import Nav from '../components/Nav';
import { CURRENT_USER } from '../graphql/query';
import { fakeUser, fakeCartItem } from '../utils/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER },
    result: { data: { me: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        },
      },
    },
  },
];

async function getNav(mock) {
  const wrapper = mount(
    <MockedProvider mocks={mock}>
      <Nav />
    </MockedProvider>
  );
  await act(wait);
  wrapper.update();

  return wrapper.find('ul[data-test="nav"]');
}

describe('<Nav />', () => {
  it('renders a minimal nav when signed out', async () => {
    const nav = await getNav(notSignedInMocks);

    expect(toJSON(nav)).toMatchSnapshot();
  });

  it('renders full nav when signed in', async () => {
    const nav = await getNav(signedInMocks);

    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain('Sign out');
  });

  it('renders the amount of items in the cart', async () => {
    const nav = await getNav(signedInMocksWithCartItems);

    const count = nav.find('div.count');
    expect(toJSON(count)).toMatchSnapshot();
  });
});
