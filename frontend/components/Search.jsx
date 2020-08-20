import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';
import { SEARCH_ITEMS } from '../graphql/query';
import * as S from './styles/Search';

const Search = () => {
  const [getItems, { data, variables }] = useLazyQuery(SEARCH_ITEMS);

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

  return (
    <S.Search>
      <input type="search" onChange={handleChange} />
      <S.DropDown>
        {(data &&
          variables.searchTerm.length &&
          data.items.map(item => (
            <S.DropDownItem key={item.id}>
              <img width="50" src={item.image} alt={item.title} />
              {item.title}
            </S.DropDownItem>
          ))) ||
          null}
      </S.DropDown>
    </S.Search>
  );
};

export default Search;
