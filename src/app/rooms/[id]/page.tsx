'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoChevronBack, IoFilter, IoEllipsisVertical } from 'react-icons/io5';
import { BiCube } from 'react-icons/bi';
import { useSession } from 'next-auth/react';

interface RoomItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

export default function RoomDetailPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();
  const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';

  // Mock data - replace with actual API call
  const roomData = {
    name: 'Main Garage',
    description: 'Main garage, basement level',
    items: [
      { id: '1', name: 'Power Tools Set', category: 'Tools', quantity: 1 },
      { id: '2', name: 'Garden Equipment', category: 'Garden', quantity: 3 },
      { id: '3', name: 'Spare Tires', category: 'Automotive', quantity: 4 },
      { id: '4', name: 'Tool Box', category: 'Tools', quantity: 2 },
      { id: '5', name: 'Lawn Mower', category: 'Garden', quantity: 1 },
      { id: '6', name: 'Car Cleaning Kit', category: 'Automotive', quantity: 2 },
    ],
  };

  const filteredItems = roomData.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                href="/rooms" 
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <IoChevronBack className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{roomData.name}</h1>
                <p className="text-sm text-gray-600">{roomData.description}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <IoEllipsisVertical className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <IoFilter className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/objects/${item.id}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BiCube className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Qty: <span className="text-gray-900 font-medium">{item.quantity}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Add Item Button (Only visible to managers) */}
      {userRole === 'MANAGER' && (
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
          <span className="text-2xl">+</span>
        </button>
      )}
    </div>
  );
} 