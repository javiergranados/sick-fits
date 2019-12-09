import gql from 'graphql-tag';

const CREATE_ITEM = gql`
  mutation createItem($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {
    createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
      id
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM };
