'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    ChevronLeft,
    MoreVertical,
    Package
} from 'lucide-react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { RoomFilter } from '@/components/RoomFilter';
import { RoomActions } from '@/components/RoomActions';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';

interface Room {
    id: number;
    name: string;
    description: string;
    items: {
        id: number;
        name: string;
        category: string;
        quantity: number;
    }[];
}

export default function RoomsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { data: session } = useSession();
    const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';

    // Mock data - replace with actual API call
    const rooms: Room[] = [
        {
            id: 1,
            name: 'Main Garage',
            description: 'Main garage, basement level',
            items: [
                { id: 1, name: 'Power Tools Set', category: 'Tools', quantity: 1 },
                { id: 2, name: 'Garden Equipment', category: 'Garden', quantity: 3 },
                { id: 3, name: 'Spare Tires', category: 'Automotive', quantity: 4 },
                { id: 4, name: 'Tool Box', category: 'Tools', quantity: 2 },
                { id: 5, name: 'Lawn Mower', category: 'Garden', quantity: 1 },
                { id: 6, name: 'Car Cleaning Kit', category: 'Automotive', quantity: 2 }
            ]
        },
        // ... other rooms data
    ];

    // If you're fetching data from an API, use useEffect:
    /*
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setIsLoading(true);
                // const response = await fetch('/api/rooms');
                // const data = await response.json();
                // setRooms(data);
            } catch (err) {
                setError('Failed to fetch rooms');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, []);
    */

    // Get unique categories
    const categories = Array.from(
        new Set(rooms.flatMap(room => room.items.map(item => item.category)))
    );

    // Filter items based on selected categories
    const filteredItems = selectedRoom?.items.filter(item =>
        selectedCategories.length === 0 || selectedCategories.includes(item.category)
    );

    const RoomsList = () => (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b">
                <div className="flex items-center mb-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        Back to Dashboard
                    </Link>
                </div>
                <h1 className="text-2xl font-semibold">Rooms</h1>
                <p className="text-gray-600">Select a room to view its contents</p>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1">
                        <input
                            type="search"
                            placeholder="Search rooms..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    {rooms.map(room => (
                        <Card
                            key={room.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedRoom(room)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">{room.name}</h3>
                                        <p className="text-sm text-gray-500">{room.description}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {room.items.length} items
                                        </p>
                                    </div>
                                    <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );

    const RoomDetail = ({ room }: { room: Room }) => {
        const [roomSearchTerm, setRoomSearchTerm] = useState('');

        const filteredItems = room.items.filter(item =>
            item.name.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(roomSearchTerm.toLowerCase())
        );

        return (
            <div className="h-full flex flex-col">
                {/* Room Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSelectedRoom(null)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-semibold">{room.name}</h1>
                            <p className="text-gray-600">{room.description}</p>
                        </div>
                        <button className="ml-auto p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Room Content */}
                <div className="p-4">
                    {/* Search and Filter */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-1">
                            <input
                                type="search"
                                placeholder="Search items..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                value={roomSearchTerm}
                                onChange={(e) => setRoomSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <SheetTrigger asChild>
                                <button className="p-2 border rounded-lg hover:bg-gray-50">
                                    <Filter className="h-5 w-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Filter Items</SheetTitle>
                                </SheetHeader>
                                <div className="py-4">
                                    {/* Filter options would go here */}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                        {filteredItems.map(item => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Package className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Qty: {item.quantity}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Add Item Button (Only visible to managers) */}
                {userRole === 'MANAGER' && (
                    <button className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                        <Plus className="h-6 w-6" />
                    </button>
                )}
            </div>
        );
    };

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={() => {/* Implement retry logic */}} />;

    return (
        <div className="min-h-screen bg-gray-50">
            {selectedRoom ? (
                <RoomDetail room={selectedRoom} />
            ) : (
                <RoomsList />
            )}
        </div>
    );
}