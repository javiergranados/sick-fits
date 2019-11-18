import { useQuery, useMutation } from '@apollo/react-hooks';
import { useInput } from '../hooks/useInput';
import * as S from './styles/Form';
import Error from './Error';
import { GET_ITEM } from '../graphql/query';
import { UPDATE_ITEM } from '../graphql/mutation';

const UpdateItem = ({ id }) => {
  const [title, setTitle] = useInput();
  const [price, setPrice] = useInput();
  const [description, setDescription] = useInput();

  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM);

  const { loading: loadingQuery, data } = useQuery(GET_ITEM, {
    variables: { id },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const variables = {
      id,
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price }),
    };
    const res = await updateItem({ variables });
    console.log(res);
  };

  if (loadingQuery) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  return (
    <S.Form onSubmit={handleSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            defaultValue={data.item.title}
            onChange={setTitle}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            defaultValue={data.item.price}
            onChange={setPrice}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            placeholder="Description"
            required
            defaultValue={data.item.description}
            onChange={setDescription}
          />
        </label>
        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </S.Form>
  );
};

export default UpdateItem;
