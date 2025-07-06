'use client';

import { RoleWithPermissions } from '@/lib/types';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

interface RolesTableProps {
  roles: RoleWithPermissions[];
}

export default function RolesTable({ roles }: RolesTableProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState<RoleWithPermissions | null>(null);

  const handleDelete = (role: RoleWithPermissions) => {
    setSelectedRole(role);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedRole) return;
    
    try {
      // TODO: Implement actual delete API call
      console.log('Deleting role:', selectedRole.id);
      enqueueSnackbar(`Role ${selectedRole.name} deleted successfully`, { variant: 'success' });
      onOpenChange();
      router.refresh();
    } catch (error) {
      console.error('Error deleting role:', error);
      enqueueSnackbar('Failed to delete role', { variant: 'error' });
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="w-full">
            <CardHeader className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{role.name}</h3>
                <p className="text-sm text-gray-500">ID: {role.id}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  color="primary"
                  variant="light"
                  onClick={() => router.push(`/roles/${role.id}`)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  color="default"
                  variant="light"
                  onClick={() => router.push(`/roles/${role.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onClick={() => handleDelete(role)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Permissions ({role.permissions.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.length > 0 ? (
                    role.permissions.map((permission) => (
                      <Chip
                        key={permission.id}
                        color="success"
                        size="sm"
                        variant="flat"
                      >
                        {permission.name}
                      </Chip>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No permissions assigned</span>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete role{' '}
                  <strong>{selectedRole?.name}</strong>? This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={confirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
