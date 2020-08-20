import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_USERS } from '../graphql/query';
import Error from './Error';
import { permissions } from '../constants';
import { Table } from './styles/Table';
import UserPermissions from './UserPermissions';

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
                <UserPermissions user={user} key={user.id} />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Permissions;
