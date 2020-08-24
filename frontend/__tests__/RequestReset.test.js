import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import RequestReset from '../components/RequestReset';
import { REQUEST_RESET } from '../graphql/mutation';

const mocks = [
  {
    request: {
      query: REQUEST_RESET,
      variables: { email: 'javier@test.com' },
    },
    result: {
      data: { requestReset: { message: 'success', __typename: 'Message' } },
    },
  },
];

describe('<RequestReset />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    const form = wrapper.find('form[data-test="form"]');

    expect(toJSON(form)).toMatchSnapshot();
  });

  it('calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    // simulate typing an email
    wrapper.find('input').simulate('change', { target: { name: 'email', value: 'javier@test.com' } });
    // submit the form
    wrapper.find('form').simulate('submit');

    await act(wait);
    wrapper.update();

    expect(wrapper.find('p').text()).toContain('Success! Check your email for a reset link!');
  });
});
