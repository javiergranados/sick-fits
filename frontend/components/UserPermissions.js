import { useState } from 'react';
import { permissions } from '../constants';
import { SickButton } from './styles/SickButton';

const UserPermissions = ({ user }) => {
  const [userPermissions, setUserPermissions] = useState(user.permissions);

  const handleChange = ({ target: { value, checked } }) => {
    setUserPermissions(prevState => {
      if (checked) {
        return prevState.concat(value);
      }
      return prevState.filter(el => el !== value);
    });
  };

  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {permissions.map(permission => (
        <td key={permission}>
          <label htmlFor={permission}>
            <input
              type="checkbox"
              value={permission}
              onChange={handleChange}
              checked={userPermissions.includes(permission)}
            />
          </label>
        </td>
      ))}
      <td>
        <SickButton>UPDATE</SickButton>
      </td>
    </tr>
  );
};

export default UserPermissions;
