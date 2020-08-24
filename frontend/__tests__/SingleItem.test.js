import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import SingleItem from '../components/SingleItem';
import { fakeItem } from '../utils/testUtils';
import { GET_ITEM } from '../graphql/query';

let mocks;
let wrapper;

const request = {
  query: GET_ITEM,
  variables: {
    id: '123',
  },
};

const resultOk = {
  data: {
    item: fakeItem(),
  },
};

const resultError = {
  errors: [{ message: 'Items Not Found!' }],
};

describe('<SingleItem />', () => {
  it('renders with proper data', async () => {
    mocks = [
      {
        request,
        result: resultOk,
      },
    ];
    wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    );

    expect(wrapper.text()).toContain('Loading...');

    await act(wait);
    wrapper.update();

    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
  });

  it('Errors with a not found item', async () => {
    mocks = [
      {
        request,
        result: resultError,
      },
    ];
    wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    );

    await act(wait);
    wrapper.update();

    const item = wrapper.find('[data-test="graphql-error"]');
    expect(item.text()).toContain('Items Not Found!');
    expect(toJSON(item)).toMatchSnapshot();
  });
});
