import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';
import { useCombobox, resetIdCounter } from 'downshift';
import { useRouter } from 'next/router';
import { SEARCH_ITEMS } from '../graphql/query';
import * as S from './styles/Search';

const Search = () => {
  const router = useRouter();
  const [getItems, { data, loading }] = useLazyQuery(SEARCH_ITEMS);

  const routeToItem = ({ selectedItem }) => {
    if (selectedItem) {
      router.push({
        pathname: '/item',
        query: {
          id: selectedItem.id,
        },
      });
    }
  };

  const {
    isOpen,
    inputValue,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items: data ? data.items : [],
    itemToString: item => (item ? item.title : ''),
    onSelectedItemChange: routeToItem,
  });

  const searchItems = debounce(
    value =>
      getItems({
        variables: { searchTerm: value },
      }),
    350
  );

  const handleChange = event => {
    event.persist();
    searchItems(event.target.value);
  };

  resetIdCounter();
  return (
    <S.Search>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            onChange: handleChange,
            className: loading ? 'loading' : '',
            placeholder: 'Search For An Item',
          })}
        />
      </div>
      <div {...getMenuProps()}>
        {data && isOpen ? (
          <S.DropDown>
            {data.items.map((item, index) => (
              <S.DropDownItem key={item.id} {...getItemProps({ item, index })} highlighted={highlightedIndex === index}>
                <img width="50" src={item.image} alt={item.title} />
                {item.title}
              </S.DropDownItem>
            ))}
            {!data.items.length && !loading && <S.DropDownItem> Nothing Found {inputValue}</S.DropDownItem>}
          </S.DropDown>
        ) : null}
      </div>
    </S.Search>
  );
};

export default Search;
