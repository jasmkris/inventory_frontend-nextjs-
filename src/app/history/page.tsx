'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoChevronBack, IoFilter } from 'react-icons/io5';
import { BiTransfer, BiTrash, BiEdit } from 'react-icons/bi';
// import { useSession } from 'next-auth/react';

interface HistoryItem {
  id: string;
  objectName: string;
  action: 'MOVED' | 'REMOVED' | 'MODIFIED';
  description: string;
  quantity: number;
  timestamp: Date;
  user: {
    name: string;
  };
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  // const { data: session } = useSession();

  // Mock data - replace with actual API call
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      objectName: 'Wine Glasses',
      action: 'MOVED',
      description: 'Moved from Kitchen to Storage',
      quantity: 6,
      timestamp: new Date('2024-01-10T02:30:00'),
      user: { name: 'John Doe' },
    },
    {
      id: '2',
      objectName: 'Bordeaux 2015',
      action: 'REMOVED',
      description: 'Removed from Wine Cellar - Consumed during dinner party',
      quantity: 1,
      timestamp: new Date('2024-01-10T01:15:00'),
      user: { name: 'Sarah Smith' },
    },
    {
      id: '3',
      objectName: 'Towels',
      action: 'MOVED',
      description: 'Moved from Laundry to Master Bedroom',
      quantity: 8,
      timestamp: new Date('2024-01-10T11:45:00'),
      user: { name: 'Maria Garcia' },
    },
    {
      id: '4',
      objectName: 'Garden Tools',
      action: 'MODIFIED',
      description: 'Modified in Main Garage - Updated quantity from 3 to 4',
      quantity: 4,
      timestamp: new Date('2024-01-10T10:20:00'),
      user: { name: 'John Doe' },
    },
    {
      id: '5',
      objectName: 'Pool Chemicals',
      action: 'REMOVED',
      description: 'Removed from Pool House - Used for pool maintenance',
      quantity: 2,
      timestamp: new Date('2024-01-10T09:30:00'),
      user: { name: 'Sarah Smith' },
    },
  ];

  const getActionIcon = (action: HistoryItem['action']) => {
    switch (action) {
      case 'MOVED':
        return <BiTransfer className="w-5 h-5 text-blue-500" />;
      case 'REMOVED':
        return <BiTrash className="w-5 h-5 text-red-500" />;
      case 'MODIFIED':
        return <BiEdit className="w-5 h-5 text-green-500" />;
    }
  };

  const filteredHistory = historyItems.filter(item =>
    item.objectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Back to Dashboard Link */}
      <Link 
        href="/dashboard" 
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
      >
        <IoChevronBack className="w-5 h-5 mr-1" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">History</h1>
        <p className="text-gray-600">Track all changes and movements</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
          <IoFilter className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getActionIcon(item.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-x-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.objectName}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span>{item.user.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 