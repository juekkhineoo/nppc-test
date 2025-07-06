export interface User {
  id: number;
  loginId: string;
  name: string;
  roleId: number;
  divisionId?: number; // Optional field for division
  isDeleted?: boolean; // Optional field for soft delete
  isLocked?: boolean; // Optional field for account lock status
  createdBy?: string; // Optional field for creator's login ID
  createdDate: Date;
  updatedDate: Date;
  UpdatedBy?: string; // Optional field for last updater's login ID
}

export interface Role {
  id: number;
  name: string;
}

export interface Permission {
  id: number;
  name: string;
}

export interface PermissionRoles {
  roleId: number;
  permissionId: number;
}

export interface UserWithRole extends User {
  roleName: string;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
}
