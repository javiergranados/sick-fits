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
      orders {
        id
      }
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
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

const GET_LOCAL_STATE = gql`
  {
    cartOpen @client
  }
`;

const SEARCH_ITEMS = gql`
  query($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      id
      image
      title
    }
  }
`;

const SINGLE_ORDER = gql`
  query($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

const GET_ALL_ORDERS = gql`
  {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

export {
  CURRENT_USER,
  GET_ALL_ORDERS,
  GET_ALL_USERS,
  GET_ITEM,
  GET_ITEMS,
  GET_LOCAL_STATE,
  PAGINATION,
  SEARCH_ITEMS,
  SINGLE_ORDER,
};
