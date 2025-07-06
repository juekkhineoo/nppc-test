import { getUserById } from '@/lib/data';
import DetailPageHeader from '@/components/DetailPageHeader';
import { UserDetailCard } from '@/components/DetailCards';
import { notFound } from 'next/navigation';

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const userId = parseInt(id);
  
  if (isNaN(userId)) {
    notFound();
  }

  try {
    const user = await getUserById(userId);
    
    if (!user) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <DetailPageHeader
          title="User Details"
          description="View user information and settings"
          itemId={user.id}
          itemType="users"
          backUrl="/users"
        />
        
        <UserDetailCard user={user} />
      </div>
    );
  } catch (error) {
    console.error('Error loading user:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800">Error Loading User</h2>
          <p className="text-red-600 mt-2">
            Unable to load user details. Please check your database configuration.
          </p>
        </div>
      </div>
    );
  }
}
