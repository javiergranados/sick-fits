import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 4000,
  description: 'This item is really cool!',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item />', () => {
  const wrapper = shallow(<ItemComponent item={fakeItem} />);

  it('renders and matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
  it('renders the pricetag and title', () => {
    const PriceTag = wrapper.find('Item__PriceTag');
    expect(PriceTag.children().text()).toBe('$40');
    expect(wrapper.find('Item__Title a').text()).toBe(fakeItem.title);
  });
  it('renders out the buttons properly', () => {
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
  });
});
