'use client';

import { Card, CardHeader, CardBody, Chip } from '@heroui/react';
import { UserWithRole, RoleWithPermissions, Permission } from '@/lib/types';

interface DetailCardProps {
  title: string;
  children: React.ReactNode;
}

export function DetailCard({ title, children }: DetailCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">{title}</h2>
      </CardHeader>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
}

interface UserDetailCardProps {
  user: UserWithRole;
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  return (
    <DetailCard title={user.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="text-sm text-gray-900">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Login ID</dt>
              <dd className="text-sm text-gray-900">{user.loginId}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">{user.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="text-sm text-gray-900">
                <Chip color="primary" size="sm" variant="flat">
                  {user.roleName}
                </Chip>
              </dd>
            </div>
            {user.divisionId && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Division ID</dt>
                <dd className="text-sm text-gray-900">{user.divisionId}</dd>
              </div>
            )}
          </dl>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Account Status</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="text-sm text-gray-900">
                <Chip 
                  color={user.isLocked ? "danger" : "success"} 
                  size="sm" 
                  variant="flat"
                >
                  {user.isLocked ? "Locked" : "Active"}
                </Chip>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Deleted</dt>
              <dd className="text-sm text-gray-900">
                <Chip 
                  color={user.isDeleted ? "danger" : "success"} 
                  size="sm" 
                  variant="flat"
                >
                  {user.isDeleted ? "Yes" : "No"}
                </Chip>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created Date</dt>
              <dd className="text-sm text-gray-900">
                {new Date(user.createdDate).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Updated Date</dt>
              <dd className="text-sm text-gray-900">
                {new Date(user.updatedDate).toLocaleDateString()}
              </dd>
            </div>
            {user.createdBy && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Created By</dt>
                <dd className="text-sm text-gray-900">{user.createdBy}</dd>
              </div>
            )}
            {user.UpdatedBy && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Updated By</dt>
                <dd className="text-sm text-gray-900">{user.UpdatedBy}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </DetailCard>
  );
}

interface RoleDetailCardProps {
  role: RoleWithPermissions;
}

export function RoleDetailCard({ role }: RoleDetailCardProps) {
  return (
    <DetailCard title={role.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="text-sm text-gray-900">{role.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">{role.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Permissions</dt>
              <dd className="text-sm text-gray-900">{role.permissions.length}</dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Permissions</h3>
          <div className="space-y-2">
            {role.permissions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <Chip
                    key={permission.id}
                    color="success"
                    size="sm"
                    variant="flat"
                  >
                    {permission.name}
                  </Chip>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No permissions assigned to this role</p>
            )}
          </div>
        </div>
      </div>
    </DetailCard>
  );
}

interface PermissionDetailCardProps {
  permission: Permission;
}

export function PermissionDetailCard({ permission }: PermissionDetailCardProps) {
  return (
    <DetailCard title={permission.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="text-sm text-gray-900">{permission.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">{permission.name}</dd>
            </div>
          </dl>
        </div>
      </div>
    </DetailCard>
  );
}
