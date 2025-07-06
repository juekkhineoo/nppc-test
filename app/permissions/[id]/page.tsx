import { getPermissionById } from '@/lib/data';
import DetailPageHeader from '@/components/DetailPageHeader';
import { PermissionDetailCard } from '@/components/DetailCards';
import { notFound } from 'next/navigation';

interface PermissionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PermissionDetailPage({ params }: PermissionDetailPageProps) {
  const { id } = await params;
  const permissionId = parseInt(id);
  
  if (isNaN(permissionId)) {
    notFound();
  }

  try {
    const permission = await getPermissionById(permissionId);
    
    if (!permission) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <DetailPageHeader
          title="Permission Details"
          description="View permission information"
          itemId={permission.id}
          itemType="permissions"
          backUrl="/permissions"
        />
        
        <PermissionDetailCard permission={permission} />
      </div>
    );
  } catch (error) {
    console.error('Error loading permission:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">Error Loading Permission</h2>
          <p className="text-red-600 mt-2">
            Unable to load permission details. Please check your database configuration.
          </p>
        </div>
      </div>
    );
  }
}
