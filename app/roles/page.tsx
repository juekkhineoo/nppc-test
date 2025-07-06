import { getRolesWithPermissions } from '@/lib/data';
import RolesTable from '@/components/RolesTable';
import PageHeader from '@/components/PageHeader';

export default async function RolesPage() {
  try {
    const roles = await getRolesWithPermissions();

    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Roles"
          description="Manage system roles and their permissions"
          buttons={[
            { href: '/roles/new', label: 'Add New Role', color: 'primary', variant: 'solid' },
            { href: '/users', label: 'View Users', color: 'default', variant: 'bordered' },
            { href: '/permissions', label: 'View Permissions', color: 'default', variant: 'bordered' }
          ]}
        />

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Roles ({roles.length})
            </h2>
          </div>
          <div className="p-6">
            {roles.length > 0 ? (
              <RolesTable roles={roles} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No roles found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading roles:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">Error Loading Roles</h2>
          <p className="text-red-600 mt-2">
            Unable to connect to the database. Please check your database configuration.
          </p>
        </div>
      </div>
    );
  }
}
