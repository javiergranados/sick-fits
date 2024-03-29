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
      title
    }
  }
`;

const SIGN_UP = gql`
  mutation signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
      password
    }
  }
`;

const SIGN_OUT = gql`
  mutation signout {
    signout {
      message
    }
  }
`;

const REQUEST_RESET = gql`
  mutation requestReset($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation resetPassword($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const UPDATE_PERMISSIONS = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      email
      name
    }
  }
`;

const TOGGLE_CART = gql`
  mutation {
    toggleCart @client
  }
`;

const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const CREATE_ORDER = gql`
  mutation($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

export {
  ADD_TO_CART,
  CREATE_ITEM,
  CREATE_ORDER,
  DELETE_ITEM,
  REMOVE_FROM_CART,
  RESET_PASSWORD,
  REQUEST_RESET,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  TOGGLE_CART,
  UPDATE_ITEM,
  UPDATE_PERMISSIONS,
};
