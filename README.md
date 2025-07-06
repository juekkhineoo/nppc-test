# Next.js 15+ User Management System

A modern user management system built with Next.js 15+, TypeScript, App Router, Tailwind CSS, and Microsoft SQL Server integration.

## Features

- 🚀 **Next.js 15+** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🗄️ **Microsoft SQL Server** integration with mssql
- 📊 **Server Components** by default
- 🎯 **Client Components** for interactive data display
- 🔐 **Role-based permissions system**

## Project Structure

```
nppc-test/
├── app/
│   ├── users/
│   │   └── page.tsx          # Users listing page
│   ├── roles/
│   │   └── page.tsx          # Roles with permissions page
│   ├── permissions/
│   │   └── page.tsx          # Permissions listing page
│   └── page.tsx              # Home page
├── components/
│   ├── UsersTable.tsx        # Client component for users table
│   ├── RolesTable.tsx        # Client component for roles table
│   └── PermissionsTable.tsx  # Client component for permissions table
├── lib/
│   ├── database.ts           # Database connection configuration
│   ├── data.ts               # Data access layer functions
│   └── types.ts              # TypeScript type definitions
├── .env.local                # Environment variables (create this)
└── database-schema.sql       # SQL Server schema and sample data
```

## Database Schema

The application uses the following database structure:

- **Users** table with foreign key to Roles
- **Roles** table for role definitions
- **Permissions** table for permission definitions  
- **PermissionRoles** junction table (many-to-many relationship)

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the project root with your SQL Server connection details:

```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true
```

### 2. Database Setup

1. Connect to your SQL Server instance
2. Create a new database or use an existing one
3. Execute the SQL schema from `database-schema.sql` to create tables and insert sample data

### 3. Install Dependencies

Dependencies are already installed, but if needed:

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- **`/`** - Home page with navigation to all sections
- **`/users`** - List all users with their assigned roles
- **`/roles`** - List all roles with their associated permissions
- **`/permissions`** - List all available permissions

## Key Technologies

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **mssql** - Microsoft SQL Server driver for Node.js
- **React Server Components** - Default server-side rendering
- **Client Components** - Interactive components with 'use client'

## Database Functions

The `lib/data.ts` file provides these helper functions:

- `getAllUsers()` - Fetch all users with role names
- `getAllRoles()` - Fetch all roles
- `getAllPermissions()` - Fetch all permissions
- `getRolesWithPermissions()` - Fetch roles with their associated permissions
- `getUserById(id)` - Fetch a specific user
- `getRoleById(id)` - Fetch a specific role

## Error Handling

The application includes proper error handling for database connections and displays user-friendly error messages when the database is unavailable.

## Development

To extend this application:

1. Add new database functions to `lib/data.ts`
2. Create new TypeScript types in `lib/types.ts`
3. Build new pages in the `app/` directory
4. Create reusable components in `components/`
5. Use Server Components for data fetching and Client Components for interactivity

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
