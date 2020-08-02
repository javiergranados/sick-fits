import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { permissions } from '../constants';
import { SickButton } from './styles/SickButton';
import Error from './Error';
import { UPDATE_PERMISSIONS } from '../graphql/mutation';

const UserPermissions = ({ user }) => {
  const [userPermissions, setUserPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useMutation(UPDATE_PERMISSIONS);

  const handleChange = ({ target: { value, checked } }) => {
    setUserPermissions(prevState => {
      if (checked) {
        return prevState.concat(value);
      }
      return prevState.filter(el => el !== value);
    });
  };

  const handleClick = async () => {
    try {
      await updatePermissions({ variables: { permissions: userPermissions, userId: user.id } });
    } catch (err) {
      // do nothing
    }
  };

  return (
    <>
      <tr>
        <td colSpan="9">
          <Error error={error} />
        </td>
      </tr>
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {permissions.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                type="checkbox"
                value={permission}
                onChange={handleChange}
                id={`${user.id}-permission-${permission}`}
                checked={userPermissions.includes(permission)}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton type="button" disabled={loading} onClick={handleClick}>
            UPDAT{loading ? 'ING' : 'E'}
          </SickButton>
        </td>
      </tr>
    </>
  );
};

export default UserPermissions;
