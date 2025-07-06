'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface DetailPageHeaderProps {
  title: string;
  description: string;
  itemId: string | number;
  itemType: 'users' | 'roles' | 'permissions';
  backUrl: string;
}

export default function DetailPageHeader({ 
  title, 
  description, 
  itemId, 
  itemType, 
  backUrl 
}: DetailPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          as={Link}
          href={`/${itemType}/${itemId}/edit`}
          color="primary"
        >
          Edit {itemType === 'users' ? 'User' : itemType === 'roles' ? 'Role' : 'Permission'}
        </Button>
        <Button
          as={Link}
          href={backUrl}
          color="default"
          variant="bordered"
        >
          Back to {itemType === 'users' ? 'Users' : itemType === 'roles' ? 'Roles' : 'Permissions'}
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
