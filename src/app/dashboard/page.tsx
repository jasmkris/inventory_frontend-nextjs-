'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { BiCube } from 'react-icons/bi';
import { HiOutlineClock } from 'react-icons/hi';
import { IoSettingsOutline, IoPerson } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import ProfileSettingsSidebar from '@/components/ProfileSettingsSidebar';
import AccessManagementSidebar from '@/components/AccessManagementSidebar';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccessManagementOpen, setIsAccessManagementOpen] = useState(false);

  const { data: session } = useSession();
  
  const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
  const isManager = userRole === 'MANAGER';

  const recentActivity = [
    {
      type: 'Item Updated',
      description: 'Wine bottle moved from Cellar to Kitchen',
      time: '2h ago',
    },
    {
      type: 'Item Updated',
      description: 'Wine bottle moved from Cellar to Kitchen',
      time: '2h ago',
    },
    {
      type: 'Item Updated',
      description: 'Wine bottle moved from Cellar to Kitchen',
      time: '3h ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Search and Settings Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          {isManager && (
            <button
              onClick={() => setIsAccessManagementOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <IoPerson className="w-5 h-5" />
              <span>Access Management</span>
            </button>
          )}
          {
            !(session === undefined || session === null || !session) && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <IoSettingsOutline className="w-6 h-6 text-gray-600" />
              </button>
            )
          }
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Manage your inventory efficiently</p>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link href="/rooms" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <FaHome className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Rooms</h2>
              <p className="text-gray-600 text-center">Manage and organize rooms</p>
            </div>
          </div>
        </Link>

        <Link href="/objects" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-4">
                <BiCube className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Objects</h2>
              <p className="text-gray-600 text-center">View and manage all items</p>
            </div>
          </div>
        </Link>

        <Link href="/history" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-4">
                <HiOutlineClock className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">History</h2>
              <p className="text-gray-600 text-center">Track all changes and movements</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BiCube className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{activity.type}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Only show Access card for managers */}
      {isManager && (
        <Link href="#" onClick={() => setIsAccessManagementOpen(true)} className="block mt-10">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                <IoPerson className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Access</h2>
              <p className="text-gray-600 text-center">Manage team access</p>
            </div>
          </div>
        </Link>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        <Plus className="h-6 w-6" />
      </button>

      <ProfileSettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={{
          name: session?.user?.name || 'John Doe',
          email: session?.user?.email || 'john.doe@example.com',
          image: session?.user?.image || undefined,
        }}
      />

      <AccessManagementSidebar
        isOpen={isAccessManagementOpen}
        onClose={() => setIsAccessManagementOpen(false)}
        currentUserRole={userRole}
      />
    </div>
  );
} 