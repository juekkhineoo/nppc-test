# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Next.js 15+ project with TypeScript, App Router, and Tailwind CSS, integrated with Microsoft SQL Server database.

## Project Structure

- Uses Next.js 15+ App Router convention
- TypeScript for type safety
- Tailwind CSS for styling
- Microsoft SQL Server integration using mssql package
- Server Components by default, Client Components where needed
- Organized with `app/`, `lib/`, and `components/` directories

## Database Schema

The database contains:
- Users table (with roleId foreign key)
- Roles table
- Permissions table
- RolePermission junction table (many-to-many relationship)

## Key Features

- `/users` - List all users with their role names
- `/roles` - List all roles with associated permissions
- `/permissions` - List all permissions
- Database connection using environment variables
- Server-side data fetching with proper error handling
