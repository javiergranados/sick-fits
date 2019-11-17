import gql from 'graphql-tag';

const CREATE_ITEM = gql`
  mutation createItem($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {
    createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
      id
    }
  }
`;

export { CREATE_ITEM };
