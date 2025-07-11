import { getAllUsers } from '@/lib/data';
import UsersTable from './table';
import PageHeader from '@/components/PageHeader';

export default async function UsersPage() {
  try {
    const users = await getAllUsers();

    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Users"
          description="Manage all system users and their roles"
          buttons={[
            { href: '/users/new', label: 'Add New User', color: 'primary', variant: 'solid' },
            { href: '/roles', label: 'View Roles', color: 'default', variant: 'bordered' },
            { href: '/permissions', label: 'View Permissions', color: 'default', variant: 'bordered' }
          ]}
        />

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Users ({users.length})
            </h2>
          </div>
          <div className="p-6">
            {users.length > 0 ? (
              <UsersTable users={users} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading users:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">Error Loading Users</h2>
          <p className="text-red-600 mt-2">
            Unable to connect to the database. Please check your database configuration.
          </p>
        </div>
      </div>
    );
  }
}
