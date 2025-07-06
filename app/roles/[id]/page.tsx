import { getRoleById } from '@/lib/data';
import DetailPageHeader from '@/components/DetailPageHeader';
import { RoleDetailCard } from '@/components/DetailCards';
import { notFound } from 'next/navigation';

interface RoleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoleDetailPage({ params }: RoleDetailPageProps) {
  const { id } = await params;
  const roleId = parseInt(id);
  
  if (isNaN(roleId)) {
    notFound();
  }

  try {
    const role = await getRoleById(roleId);
    
    if (!role) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <DetailPageHeader
          title="Role Details"
          description="View role information and permissions"
          itemId={role.id}
          itemType="roles"
          backUrl="/roles"
        />
        
        <RoleDetailCard role={role} />
      </div>
    );
  } catch (error) {
    console.error('Error loading role:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">Error Loading Role</h2>
          <p className="text-red-600 mt-2">
            Unable to load role details. Please check your database configuration.
          </p>
        </div>
      </div>
    );
  }
}
