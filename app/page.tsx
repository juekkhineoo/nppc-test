import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NPPC Management System
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            A Next.js 15+ application with TypeScript, App Router, and Microsoft SQL Server integration
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link
              href="/users"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Users</h2>
              <p className="text-gray-600">
                View and manage all system users with their assigned roles
              </p>
            </Link>

            <Link
              href="/roles"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Roles</h2>
              <p className="text-gray-600">
                Manage system roles and their associated permissions
              </p>
            </Link>

            <Link
              href="/permissions"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Permissions</h2>
              <p className="text-gray-600">
                View all system permissions and access controls
              </p>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Setup</h3>
            <p className="text-gray-600 mb-4">
              Before using this application, make sure to:
            </p>
            <ol className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                Configure your SQL Server connection in <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env.local</code>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                Run the SQL schema from <code className="bg-gray-100 px-2 py-1 rounded text-sm">database-schema.sql</code>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                Start exploring the user management features
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
