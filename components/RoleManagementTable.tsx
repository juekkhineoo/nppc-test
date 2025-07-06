'use client';

import { RoleWithPermissions } from '@/lib/types';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

interface RoleManagementTableProps {
  roles: RoleWithPermissions[];
}

export default function RoleManagementTable({ roles }: RoleManagementTableProps) {
  const router = useRouter();

  return (
    <div className="bg-white">
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-900 mb-3">Name</h3>
      </div>
      
      <div className="space-y-2">
        {roles.map((role) => (
          <div 
            key={role.id} 
            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm text-gray-700">{role.name}</span>
            <Button
              size="sm"
              variant="light"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => router.push(`/roles/${role.id}/edit`)}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Button>
          </div>
        ))}
      </div>
      
      {roles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No roles found</p>
        </div>
      )}
    </div>
  );
}
