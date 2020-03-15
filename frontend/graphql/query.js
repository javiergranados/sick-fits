import gql from 'graphql-tag';

const GET_ITEMS = gql`
  {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const GET_ITEM = gql`
  query($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

const PAGINATION = gql`
  {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export { GET_ITEMS, GET_ITEM, PAGINATION };
