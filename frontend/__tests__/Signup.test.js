import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloConsumer } from 'react-apollo';
import { act } from 'react-dom/test-utils';
import Signup from '../components/Signup';
import { SIGN_UP } from '../graphql/mutation';
import { CURRENT_USER } from '../graphql/query';
import { fakeUser } from '../utils/testUtils';

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value },
  });
}

const me = fakeUser();

const mocks = [
  // signup mock mutation
  {
    request: {
      query: SIGN_UP,
      variables: {
        name: me.name,
        email: me.email,
        password: '123',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // current user query mock
  {
    request: { query: CURRENT_USER },
    result: { data: { me } },
  },
];

describe('<Signup />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    type(wrapper, 'name', me.name);
    type(wrapper, 'email', me.email);
    type(wrapper, 'password', '123');

    wrapper.update();
    wrapper.find('form').simulate('submit');
    await act(wait);

    // query the user out of the apollo client
    const user = await apolloClient.query({ query: CURRENT_USER });
    expect(user.data.me).toMatchObject(me);
  });
});
