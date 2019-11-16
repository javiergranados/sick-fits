import { useInput } from '../hooks/useInput';
import * as S from './styles/Form';

const createItem = () => {
  const [title, setTitle] = useInput('');
  const [price, setPrice] = useInput(0);
  const [description, setDescription] = useInput('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="title">
          Title
          <input type="text" name="title" placeholder="Title" required value={title} onChange={setTitle} />
        </label>
        <label htmlFor="price">
          Price
          <input type="number" name="price" placeholder="Price" required value={price} onChange={setPrice} />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            placeholder="Description"
            required
            value={description}
            onChange={setDescription}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </S.Form>
  );
};

export default createItem;
