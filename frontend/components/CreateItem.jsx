import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import * as S from './styles/Form';
import Error from './Error';
import { CREATE_ITEM } from '../graphql/mutation';

const CreateItem = () => {
  const [title, setTitle] = useInput('');
  const [price, setPrice] = useInput(0);
  const [description, setDescription] = useInput('');
  const [image, setImage] = useState('');
  const [largeImage, setLargeImage] = useState('');

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await createItem({ variables: { title, price, description, image, largeImage } });
      Router.push({
        pathname: '/item',
        query: { id: data.createItem.id },
      });
    } catch (err) {
      // do nothing
    }
  };

  const uploadFile = async ({ target }) => {
    const { files } = target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sick-fits');

    const res = await fetch('https://api.cloudinary.com/v1_1/jvgranados/image/upload', {
      method: 'post',
      body: data,
    });
    const file = await res.json();

    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
  };

  return (
    <S.Form onSubmit={handleSubmit} data-test="form">
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input type="file" name="file" placeholder="Upload an image" onChange={uploadFile} />
        </label>
        {image && <img widt="200" src={image} alt="Upload Preview" />}
        <label htmlFor="title">
          Title
          <input id="title" type="text" name="title" placeholder="Title" required value={title} onChange={setTitle} />
        </label>
        <label htmlFor="price">
          Price
          <input id="price" type="number" name="price" placeholder="Price" required value={price} onChange={setPrice} />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
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

export default CreateItem;
