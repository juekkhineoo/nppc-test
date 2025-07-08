'use client';

import { Permission } from '@/lib/types';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
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

interface PermissionsTableProps {
  permissions: Permission[];
}

interface Column {
  key: string;
  label: string;
}

export default function PermissionsTable({ permissions }: PermissionsTableProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const handleDelete = (permission: Permission) => {
    setSelectedPermission(permission);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedPermission) return;
    
    try {
      // TODO: Implement actual delete API call
      console.log('Deleting permission:', selectedPermission.id);
      enqueueSnackbar(`Permission ${selectedPermission.name} deleted successfully`, { variant: 'success' });
      onOpenChange();
      router.refresh();
    } catch (error) {
      console.error('Error deleting permission:', error);
      enqueueSnackbar('Failed to delete permission', { variant: 'error' });
    }
  };

  const columns: Column[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NAME' },
    { key: 'actions', label: 'ACTIONS' }
  ];

  return (
    <>
      <Table aria-label="Permissions table" className="min-w-full">
        <TableHeader columns={columns}>
          {(column: Column) => (
            <TableColumn key={column.key} className="bg-gray-50">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={permissions}>
          {(permission: Permission) => (
            <TableRow key={permission.id}>
              <TableCell className="font-medium">{permission.id}</TableCell>
              <TableCell>
                <Chip color="secondary" size="sm" variant="flat">
                  {permission.name}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="light"
                    onClick={() => router.push(`/permissions/${permission.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    color="default"
                    variant="light"
                    onClick={() => router.push(`/permissions/${permission.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onClick={() => handleDelete(permission)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete permission{' '}
                  <strong>{selectedPermission?.name}</strong>? This action cannot be undone.
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
