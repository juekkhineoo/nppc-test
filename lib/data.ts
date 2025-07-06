import { connectToDatabase, sql } from "./database";
import { Role, Permission, UserWithRole, RoleWithPermissions } from "./types";

export async function getAllUsers(): Promise<UserWithRole[]> {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT 
        u.id,
        u.loginId,
        u.name,
        u.roleId,
        u.divisionId,
        u.isDeleted,
        u.isLocked,
        u.createdBy,
        u.updatedBy,
        u.createdDate,
        u.updatedDate,
        r.name as roleName
      FROM Users u
      INNER JOIN Roles r ON u.roleId = r.id
      ORDER BY u.name
    `);

    return result.recordset;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getAllRoles(): Promise<Role[]> {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT 
        id,
        name
      FROM Roles
      ORDER BY name
    `);

    return result.recordset;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

export async function getAllPermissions(): Promise<Permission[]> {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT 
        id,
        name
      FROM Permissions
      ORDER BY name
    `);

    return result.recordset;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
}

export async function getRolesWithPermissions(): Promise<
  RoleWithPermissions[]
> {
  try {
    const pool = await connectToDatabase();

    // Get all roles
    const rolesResult = await pool.request().query(`
      SELECT 
        id,
        name
      FROM Roles
      ORDER BY name
    `);

    // Get all permissions for each role
    const permissionsResult = await pool.request().query(`
      SELECT 
        rp.role_Id,
        p.id
      FROM PermissionRoles rp
      INNER JOIN Permissions p ON rp.permission_Id = p.id
      ORDER BY rp.role_Id
    `);

    // Combine roles with their permissions
    const rolesWithPermissions: RoleWithPermissions[] =
      rolesResult.recordset.map((role) => ({
        ...role,
        permissions: permissionsResult.recordset.filter(
          (permission) => permission.roleId === role.id
        ),
      }));

    return rolesWithPermissions;
  } catch (error) {
    console.error("Error fetching roles with permissions:", error);
    throw error;
  }
}

export async function getUserById(id: number): Promise<UserWithRole | null> {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          u.id,
          u.loginId,
          u.name,
          u.roleId,
          u.divisionId,
          u.isDeleted,
          u.isLocked,
          u.createdBy,
          u.updatedBy,
          u.createdDate,
          u.updatedDate,
          r.name as roleName
        FROM Users u
        INNER JOIN Roles r ON u.roleId = r.id
        WHERE u.id = @id
      `);

    return result.recordset[0] || null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function getRoleById(id: number): Promise<Role | null> {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          id,
          name
        FROM Roles
        WHERE id = @id
      `);

    return result.recordset[0] || null;
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    throw error;
  }
}
