import { useMutation } from '@apollo/react-hooks';
import { DELETE_ITEM } from '../graphql/mutation';

const CreateItem = ({ children, id }) => {
  const [deleteItem] = useMutation(DELETE_ITEM);

  const handleClick = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      const variables = {
        id,
      };
      const res = await deleteItem({ variables });
      console.log(res);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default CreateItem;
