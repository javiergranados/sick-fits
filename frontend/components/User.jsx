import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER } from '../graphql/query';

const User = ({ children }) => {
  const { data } = useQuery(CURRENT_USER, { fetchPolicy: 'network-only' });
  return children(data || {});
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
