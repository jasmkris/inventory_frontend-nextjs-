'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoChevronBack, IoFilter } from 'react-icons/io5';
import { BiTransfer, BiTrash, BiEdit, BiPlus } from 'react-icons/bi';
// import { useSession } from 'next-auth/react';
import { Clock, Filter } from 'lucide-react';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { Sheet, SheetHeader, SheetDescription, SheetTitle, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { objectCategories } from '@/lib/utils';
import { objectService } from '@/services/api';
import { ObjectHistory } from '@/types/inventory';

interface HistoryItem {
  id: string;
  objectName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE' | 'TRANSIT' | 'REMOVE';
  description: string;
  quantity: number;
  timestamp: Date;
  user: {
    name: string;
  };
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [objectSearchTerm, setObjectSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('name');

  // Mock data - replace with actual API call
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      objectName: 'Wine Glasses',
      action: 'MOVE',
      description: 'Moved from Kitchen to Storage',
      quantity: 6,
      timestamp: new Date('2024-01-10T02:30:00'),
      user: { name: 'John Doe' },
    },
    {
      id: '2',
      objectName: 'Bordeaux 2015',
      action: 'REMOVE',
      description: 'Removed from Wine Cellar - Consumed during dinner party',
      quantity: 1,
      timestamp: new Date('2024-01-10T01:15:00'),
      user: { name: 'Sarah Smith' },
    },
    {
      id: '3',
      objectName: 'Towels',
      action: 'MOVE',
      description: 'Moved from Laundry to Master Bedroom',
      quantity: 8,
      timestamp: new Date('2024-01-10T11:45:00'),
      user: { name: 'Maria Garcia' },
    },
    {
      id: '4',
      objectName: 'Garden Tools',
      action: 'UPDATE',
      description: 'Modified in Main Garage - Updated quantity from 3 to 4',
      quantity: 4,
      timestamp: new Date('2024-01-10T10:20:00'),
      user: { name: 'John Doe' },
    },
    {
      id: '5',
      objectName: 'Pool Chemicals',
      action: 'REMOVE',
      description: 'Removed from Pool House - Used for pool maintenance',
      quantity: 2,
      timestamp: new Date('2024-01-10T09:30:00'),
      user: { name: 'Sarah Smith' },
    },
  ];

  const getActionIcon = (action: HistoryItem['action']) => {
    switch (action) {
      case 'MOVE':
        return <BiTransfer className="w-5 h-5 text-blue-500" />;
      case 'REMOVE':
        return <BiTrash className="w-5 h-5 text-red-500" />;
      case 'UPDATE':
        return <BiEdit className="w-5 h-5 text-green-500" />;
      case 'CREATE':
        return <BiPlus className="w-5 h-5 text-green-500" />;
      case 'DELETE':
        return <BiTrash className="w-5 h-5 text-red-500" />;
      case 'TRANSIT':
        return <BiTransfer className="w-5 h-5 text-blue-500" />;
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
      <div className="flex items-center gap-2 mb-4">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search objects name..."
              value={objectSearchTerm}
              onChange={(e) => setObjectSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <SheetTrigger asChild>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Objects</SheetTitle>
              <SheetDescription>
                Adjust filters to find specific objects
              </SheetDescription>
            </SheetHeader>

            <div className="py-4 space-y-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key='ALL' value='ALL'>All Categories</SelectItem>
                    {objectCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select
                  value={sortBy}
                  onValueChange={(value: 'name' | 'quantity') => setSortBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="quantity">Quantity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSortBy('name');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
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
                    <Clock className="w-4 h-4 mr-1" />
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