import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_USERS } from '../graphql/query';
import Error from './Error';
import { Table } from './styles/Table';
import { SickButton } from './styles/SickButton';

const permissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

const Permissions = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Error error={error} />
      {data && data.users && (
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {permissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {permissions.map(permission => (
                    <td key={permission}>
                      <label htmlFor={`${user.id}-permission-${permission}`}>
                        <input type="checkbox" checked={user.permissions.includes(permission)} />
                      </label>
                    </td>
                  ))}
                  <td>
                    <SickButton>UPDATE</SickButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Permissions;
