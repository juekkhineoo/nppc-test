'use client';

import { UserWithRole } from '@/lib/types';
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

interface UsersTableProps {
  users: UserWithRole[];
}

interface Column {
  key: string;
  label: string;
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);

  const handleDelete = (user: UserWithRole) => {
    setSelectedUser(user);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      // TODO: Implement actual delete API call
      console.log('Deleting user:', selectedUser.id);
      enqueueSnackbar(`User ${selectedUser.name} deleted successfully`, { variant: 'success' });
      onOpenChange();
      router.refresh();
    } catch (error) {
      console.error('Error deleting user:', error);
      enqueueSnackbar('Failed to delete user', { variant: 'error' });
    }
  };

  const columns: Column[] = [
    { key: 'id', label: 'ID' },
    { key: 'loginId', label: 'LOGIN NAME' },
    { key: 'name', label: 'NAME' },
    { key: 'roleName', label: 'ROLE' },
    { key: 'createdDate', label: 'CREATED AT' },
    { key: 'actions', label: 'ACTIONS' }
  ];

  return (
    <>
      <Table aria-label="Users table" className="min-w-full" color="default">
        <TableHeader columns={columns}>
          {(column: Column) => (
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(user: UserWithRole) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.loginId}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Chip color="primary" size="sm" variant="flat">
                  {user.roleName}
                </Chip>
              </TableCell>
              <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="light"
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    color="default"
                    variant="light"
                    onClick={() => router.push(`/users/${user.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onClick={() => handleDelete(user)}
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
                  Are you sure you want to delete user{' '}
                  <strong>{selectedUser?.name}</strong>? This action cannot be undone.
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
