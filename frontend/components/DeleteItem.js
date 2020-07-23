import swal from 'sweetalert';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_ITEM } from '../graphql/mutation';
import { GET_ITEMS } from '../graphql/query';

const CreateItem = ({ children, id }) => {
  const update = (cache, { data }) => {
    const { items } = cache.readQuery({ query: GET_ITEMS });
    cache.writeQuery({
      query: GET_ITEMS,
      data: { items: items.filter(item => item.id !== data.deleteItem.id) },
    });
  };

  const [deleteItem] = useMutation(DELETE_ITEM, {
    update,
  });

  const handleClick = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      const variables = {
        id,
      };
      try {
        const { data } = await deleteItem({ variables });
        swal({
          icon: 'success',
          title: 'Good job!',
          text: `You delete ${data.deleteItem.title}`,
          closeOnClickOutside: false,
        });
      } catch (err) {
        // do nothing
      }
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default CreateItem;
