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

export { GET_ITEMS };
