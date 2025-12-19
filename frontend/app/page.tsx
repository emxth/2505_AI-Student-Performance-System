'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                AI Student Performance System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to your AI Student Performance System dashboard.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg">Quick Stats</h3>
                <p className="text-gray-600">
                  Role: <span className="font-medium">{user.role}</span>
                </p>
                <p className="text-gray-600">
                  Email: <span className="font-medium">{user.email}</span>
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg">System Features</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Student Performance Tracking</li>
                  <li>AI-powered Analytics</li>
                  <li>Progress Reports</li>
                  <li>Predictive Analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}