'use client';

import { RoleWithPermissions } from '@/lib/types';

interface RolesTableProps {
  roles: RoleWithPermissions[];
}

export default function RolesTable({ roles }: RolesTableProps) {
  return (
    <div className="space-y-6">
      {roles.map((role) => (
        <div key={role.id} className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
              {/* <p className="text-sm text-gray-500">{role.description}</p> */}
            </div>
            <div className="text-sm text-gray-500">
              ID: {role.id}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
            <div className="flex flex-wrap gap-2">
              {role.permissions.length > 0 ? (
                role.permissions.map((permission) => (
                  <span
                    key={permission.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {permission.name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No permissions assigned</span>
              )}
            </div>
          </div>
          
          {/* <div className="text-xs text-gray-500">
            Created: {new Date(role.createdAt).toLocaleDateString()}
          </div> */}
        </div>
      ))}
    </div>
  );
}
