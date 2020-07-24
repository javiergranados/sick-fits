import gql from 'graphql-tag';
import { perPage } from '../config';

const GET_ITEMS = gql`
  query($skip: Int = 0, $first: Int = ${perPage}) {
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
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

const CURRENT_USER = gql`
  {
    me {
      id
      name
      email
      permissions
    }
  }
`;

const GET_ALL_USERS = gql`
  {
    users {
      id
      name
      email
      permissions
    }
  }
`;

export { GET_ITEMS, GET_ITEM, PAGINATION, CURRENT_USER, GET_ALL_USERS };
