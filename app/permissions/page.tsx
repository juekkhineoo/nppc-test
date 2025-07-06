import { getAllPermissions } from '@/lib/data';
import PermissionsTable from '@/components/PermissionsTable';
import PageHeader from '@/components/PageHeader';

export default async function PermissionsPage() {
  try {
    const permissions = await getAllPermissions();

    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Permissions"
          description="Manage system permissions and access controls"
          buttons={[
            { href: '/permissions/new', label: 'Add New Permission', color: 'primary', variant: 'solid' },
            { href: '/users', label: 'View Users', color: 'default', variant: 'bordered' },
            { href: '/roles', label: 'View Roles', color: 'default', variant: 'bordered' }
          ]}
        />

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Permissions ({permissions.length})
            </h2>
          </div>
          <div className="p-6">
            {permissions.length > 0 ? (
              <PermissionsTable permissions={permissions} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No permissions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading permissions:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">Error Loading Permissions</h2>
          <p className="text-red-600 mt-2">
            Unable to connect to the database. Please check your database configuration.
          </p>
        </div>
      </div>
    );
  }
}
