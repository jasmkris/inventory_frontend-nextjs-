'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoChevronBack, IoChevronForward, IoFilter } from 'react-icons/io5';
import { BiCube } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import { CreateObjectModal } from '@/components/objects/CreateObjectModal';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { objectService, roomService } from '@/services/api';

interface Object {
  id: string;
  name: string;
  category: string;
  room: string;
  quantity: number;
}

export default function ObjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();
  const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
  const isManager = userRole === 'MANAGER';

  const { toast } = useToast();
  const [isCreateObjectModalOpen, setIsCreateObjectModalOpen] = useState(false);
  const [objects, setObjects] = useState<any[]>([]);
  const [roomsList, setRoomsList] = useState([]);
  const [roomsId, setRoomsId] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomService.getRooms();
      setRoomsList(rooms as any);
    }
    fetchRooms();
  }, [])

  // Mock data - replace with actual API call
  // const objects: Object[] = [
  //   {
  //     id: '1',
  //     name: 'Power Tools Set',
  //     category: 'Tools',
  //     room: 'Main Garage',
  //     quantity: 1,
  //   },
  //   {
  //     id: '2',
  //     name: 'Garden Equipment',
  //     category: 'Garden',
  //     room: 'Main Garage',
  //     quantity: 3,
  //   },
  //   {
  //     id: '3',
  //     name: 'Spare Tires',
  //     category: 'Automotive',
  //     room: 'Main Garage',
  //     quantity: 4,
  //   },
  //   {
  //     id: '4',
  //     name: 'Tool Box',
  //     category: 'Tools',
  //     room: 'Main Garage',
  //     quantity: 2,
  //   },
  //   {
  //     id: '5',
  //     name: 'Lawn Mower',
  //     category: 'Garden',
  //     room: 'Main Garage',
  //     quantity: 1,
  //   },
  //   {
  //     id: '6',
  //     name: 'Bordeaux 2015',
  //     category: 'Red Wine',
  //     room: 'Wine Cellar',
  //     quantity: 12,
  //   },
  // ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Object name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
    } catch (error) {
      console.error('Failed to create object:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredObjects = objects.filter(object =>
    object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    object.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    object.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateObject = async (objectData: {
    name: string;
    category: 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';
    quantity: number;
    roomId: string;
    description?: string;
  }) => {
    try {
      await objectService.createObject(objectData as any);
      toast({
        title: "Success",
        description: "Object created successfully",
      });

      setObjects(prevObjects => [...prevObjects, objectData]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create object",
        variant: "destructive",
      });
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Objects</h1>
        <p className="text-gray-600">View and manage all items</p>
      </div>

      {/* Search Bar with Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search objects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
          <IoFilter className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Objects List */}
      <div className="space-y-4">
        {filteredObjects.map((object) => (
          <Link
            key={object.id}
            href={`/objects/${object.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BiCube className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {object.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span>{object.category}</span>
                    <span className="mx-2">•</span>
                    <span>{object.room}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-sm text-gray-500">Qty: </span>
                  <span className="font-medium">{object.quantity}</span>
                </div>
                <IoChevronForward className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Add Object Button */}
      {/* Add Item Button (Only visible to managers) */}
      {isManager && (
        <button onClick={() => setIsCreateObjectModalOpen(true)} className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <Plus className="h-6 w-6" />
        </button>
      )}

      {isCreateObjectModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* ... existing code ... */}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Room *
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  required
                >
                  <option value="">Select a room</option>
                  {roomsList.map((room: any) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ... rest of form fields ... */}

              <button
                type="submit"
                disabled={isLoading || !selectedRoomId}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Object'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* <CreateObjectModal
        isOpen={isCreateObjectModalOpen}
        onClose={() => setIsCreateObjectModalOpen(false)}
        onSubmit={handleCreateObject}
        roomId={selectedRoomId}
      /> */}
    </div>
  );
} 