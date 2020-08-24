import { mount } from 'enzyme';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import PleaseSignIn from '../components/PleaseSignIn';
import { CURRENT_USER } from '../graphql/query';
import { fakeUser } from '../utils/testUtils';

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

const Hey = () => <p>Hey!</p>;

describe('<PleaseSignIn />', () => {
  it('renders the sign in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    expect(wrapper.text()).toContain('Please Sign In before Continuing');
    expect(wrapper.find('Signin').exists()).toBe(true);
  });

  it('renders the child component when the user is signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <Hey />
        </PleaseSignIn>
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    // expect(wrapper.find('Hey').exists()).toBe(true);
    expect(wrapper.contains(<Hey />)).toBe(true);
  });
});
