'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { BiCube } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import { CreateObjectModal } from '@/components/objects/CreateObjectModal';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { objectService, roomService } from '@/services/api';
import { X, Filter } from 'lucide-react';
import { LoadingState } from '@/components/LoadingState';
import NotData from '@/components/NotData';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { objectCategories } from '@/lib/utils';
import { ObjectCategory } from '@/types/inventory';

interface Object {
  id: string;
  name: string;
  category: string;
  roomName: string;
  quantity: number;
}

interface Room {
  id: string;
  name: string;
}

export default function ObjectsPage() {
  const { data: session } = useSession();
  const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
  const isManager = userRole === 'MANAGER';

  const { toast } = useToast();
  const [isCreateObjectModalOpen, setIsCreateObjectModalOpen] = useState(false);
  const [isCreateRoomId, setIsCreateRoomId] = useState(false);

  const [objects, setObjects] = useState<Object[]>([]);
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  // const [roomsId, setRoomsId] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  // const [name, setName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'quantity'>('name');
  const [objectSearchTerm, setObjectSearchTerm] = useState('');

  const getObjects = async () => {
    const objects = await objectService.getObjects();
    setObjects(objects);
    setIsLoading(false);
  }


  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      const rooms = await roomService.getRooms();
      setRoomsList(rooms);
    }
    fetchRooms();
    getObjects();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedRoomId, 'selectedRoomId');
    if (!selectedRoomId.trim()) {
      toast({
        title: "Error",
        description: "Object name is required",
        variant: "destructive",
      });
      return;
    }
    setIsCreateRoomId(false);
    setIsCreateObjectModalOpen(true);
    try {
      setIsLoading(true);
    } catch (error) {
      console.error('Failed to create object:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const filteredObjects = objects.filter(object =>
  //   object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   object.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   object.roomName?.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredAndSortedObjects = useMemo(() => {
    return objects
      .filter(obj => {
        const matchesSearch = obj.name.toLowerCase().includes(objectSearchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || obj.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return b.quantity - a.quantity;
      });
  }, [objects, objectSearchTerm, selectedCategory, sortBy]);

  const handleCreateObject = async (objectData: {
    name: string;
    category: ObjectCategory;
    quantity: number;
    roomId: string;
    description?: string;
  }) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(objectData).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value.toString());
      });
      await objectService.createObject(formData);
      toast({
        title: "Success",
        description: "Object created successfully",
      });
      getObjects();
    } catch (error) {
      console.error('Failed to create object:', error);
      toast({
        title: "Error",
        description: "Failed to create object",
        variant: "destructive",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

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

      {/* Add this filter section */}
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

      {/* Objects List */}
      <div className="space-y-4">
        {filteredAndSortedObjects.length === 0 ? (
          <NotData />
        ) : (
          filteredAndSortedObjects.map((object) => (
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
                      <span>{object.roomName}</span>
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
          ))
        )}
      </div>

      {/* Add Object Button */}
      {/* Add Item Button (Only visible to managers) */}
      {isManager && (
        <button onClick={() => setIsCreateRoomId(true)} className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <Plus className="h-6 w-6" />
        </button>
      )}

      {isCreateRoomId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* ... existing code ... */}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <div className="block text-sm font-medium text-gray-700">
                  <h1 className='text-lg font-bold'>Select the Room</h1>
                  <button
                    onClick={() => { setIsCreateRoomId(false) }}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  required
                >
                  <option value="">Select a room</option>
                  {roomsList.map((room: Room) => (
                    <option key={room?.id} value={room?.id}>
                      {room?.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading || !selectedRoomId}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Waiting...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      )}

      <CreateObjectModal
        isOpen={isCreateObjectModalOpen}
        onClose={() => setIsCreateObjectModalOpen(false)}
        onSubmit={handleCreateObject}
        roomId={selectedRoomId}
      />
    </div>
  );
} 