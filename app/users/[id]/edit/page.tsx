'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Button, 
  Input, 
  Select, 
  SelectItem, 
  Switch
} from '@heroui/react';
import { UserWithRole, Role } from '@/lib/types';

interface UserEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserEditPage({ params }: UserEditPageProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    loginId: '',
    name: '',
    roleId: '',
    divisionId: '',
    isLocked: false,
    isDeleted: false
  });
  const [paramId, setParamId] = useState<string>('');

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setParamId(resolvedParams.id);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!paramId) return;
    
    const fetchData = async () => {
      try {
        const userId = parseInt(paramId);
        if (isNaN(userId)) {
          router.push('/users');
          return;
        }

        // Fetch user data and roles
        const [userResponse, rolesResponse] = await Promise.all([
          fetch(`/api/users/${userId}`),
          fetch('/api/roles')
        ]);

        if (!userResponse.ok || !rolesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const userData = await userResponse.json();
        const rolesData = await rolesResponse.json();

        setUser(userData);
        setRoles(rolesData);
        setFormData({
          loginId: userData.loginId,
          name: userData.name,
          roleId: userData.roleId.toString(),
          divisionId: userData.divisionId?.toString() || '',
          isLocked: userData.isLocked || false,
          isDeleted: userData.isDeleted || false
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        enqueueSnackbar('Failed to load user data', { variant: 'error' });
        router.push('/users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paramId, router, enqueueSnackbar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/users/${paramId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          roleId: parseInt(formData.roleId),
          divisionId: formData.divisionId ? parseInt(formData.divisionId) : null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      enqueueSnackbar('User updated successfully', { variant: 'success' });
      router.push(`/users/${paramId}`);
    } catch (error) {
      console.error('Error updating user:', error);
      enqueueSnackbar('Failed to update user', { variant: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">User Not Found</h2>
          <p className="text-red-600 mt-2">The requested user could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-600 mt-2">Update user information and settings</p>
        </div>
        <Button
          color="default"
          variant="bordered"
          onClick={() => router.push(`/users/${paramId}`)}
        >
          Cancel
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-semibold">User Information</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Login ID"
                value={formData.loginId}
                onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                required
              />
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Select
                label="Role"
                selectedKeys={[formData.roleId]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setFormData({ ...formData, roleId: selectedKey });
                }}
                required
              >
                {roles.map((role) => (
                  <SelectItem key={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Division ID"
                type="number"
                value={formData.divisionId}
                onChange={(e) => setFormData({ ...formData, divisionId: e.target.value })}
                placeholder="Optional"
              />
            </div>

            <div className="flex gap-6">
              <Switch
                isSelected={formData.isLocked}
                onValueChange={(value) => setFormData({ ...formData, isLocked: value })}
              >
                Account Locked
              </Switch>
              <Switch
                isSelected={formData.isDeleted}
                onValueChange={(value) => setFormData({ ...formData, isDeleted: value })}
              >
                Soft Deleted
              </Switch>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                color="primary"
                isLoading={saving}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                color="default"
                variant="bordered"
                onClick={() => router.push(`/users/${paramId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
