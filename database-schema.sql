-- SQL Server Database Schema
-- Execute these statements to create the required tables

-- Create Roles table
CREATE TABLE Roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE
);

-- Create Users table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    loginId NVARCHAR(100) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    divisionId NVARCHAR(255) NOT NULL UNIQUE,
    isDeleted BIT DEFAULT 0,
    isLocked BIT DEFAULT 0,
    roleId INT NOT NULL,
    createdBy NVARCHAR(100) NULL,
    updatedBy NVARCHAR(100) NULL,
    createdDate DATETIME2 DEFAULT GETDATE(),
    updatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (roleId) REFERENCES Roles(id)
);

-- Create Permissions table
CREATE TABLE Permissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE
);

-- Create PermissionRoles junction table (many-to-many relationship)
CREATE TABLE PermissionRoles (
    role_Id INT NOT NULL,
    permission_Id INT NOT NULL,
    PRIMARY KEY (role_Id, permission_Id),
    FOREIGN KEY (role_Id) REFERENCES Roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_Id) REFERENCES Permissions(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IX_Users_roleId ON Users(roleId);
CREATE INDEX IX_Users_email ON Users(email);
CREATE INDEX IX_RolePermission_roleId ON PermissionRoles(roleId);
CREATE INDEX IX_RolePermission_permissionId ON PermissionRoles(permissionId);

-- Insert sample data
-- INSERT INTO Roles (name, description) VALUES
-- ('Admin'),
-- ('Manager'),
-- ('User'),
-- ('Guest');

-- INSERT INTO Permissions (name, description) VALUES
-- ('READ_USERS'),
-- ('WRITE_USERS'),
-- ('DELETE_USERS'),
-- ('READ_ROLES'),
-- ('WRITE_ROLES'),
-- ('DELETE_ROLES'),
-- ('READ_PERMISSIONS'),
-- ('WRITE_PERMISSIONS'),
-- ('DELETE_PERMISSIONS'),
-- ('SYSTEM_ADMIN');

-- INSERT INTO Users (firstName, lastName, email, roleId) VALUES
-- ('John', 'Doe', 'john.doe@example.com', 1),
-- ('Jane', 'Smith', 'jane.smith@example.com', 2),
-- ('Bob', 'Johnson', 'bob.johnson@example.com', 3),
-- ('Alice', 'Brown', 'alice.brown@example.com', 3),
-- ('Charlie', 'Wilson', 'charlie.wilson@example.com', 4);

-- Assign permissions to roles
-- INSERT INTO PermissionRoles (roleId, permissionId) VALUES
-- -- Admin (roleId: 1) - All permissions
-- (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
-- -- Manager (roleId: 2) - Read/Write permissions, no delete
-- (2, 1), (2, 2), (2, 4), (2, 5), (2, 7), (2, 8),
-- -- User (roleId: 3) - Read permissions only
-- (3, 1), (3, 4), (3, 7),
-- -- Guest (roleId: 4) - Limited read permissions
-- (4, 1), (4, 4);
