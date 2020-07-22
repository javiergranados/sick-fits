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

export { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, SIGN_UP, SIGN_IN, SIGN_OUT, REQUEST_RESET };
