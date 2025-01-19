'use client';

import { useEffect, useState } from 'react';
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
// import { RoomFilter } from '@/components/RoomFilter';
// import { RoomActions } from '@/components/RoomActions';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { objectService, roomService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { CreateRoomModal } from '@/components/rooms/CreateRoomModal';
import { CreateObjectModal } from '@/components/objects/CreateObjectModal';
// import { any } from 'zod';

interface Room {
    id: string;
    name: string;
    description: string | null;
    isTransit: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count?: {
        objects: number;
    };
}

interface Object {
    id: string;
    name: string;
    category: string;
    quantity: number;
    roomId: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    room?: Room;
}

export default function RoomsPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [objects, setObjects] = useState<Object[]>([]);
    // const userRole = session?.user?.role || 'EMPLOYEE';
    const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
    const isManager = userRole === 'MANAGER';
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // ============= Fetch rooms =============
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default context menu
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setIsMenuVisible(true);
    };

    const handleMenuItemClick = (action: string) => {
        console.log(`Action selected: ${action}`);
        setIsMenuVisible(false); // Hide the menu after selection
    };

    // Fetch rooms
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setIsLoading(true);
                const data = await roomService.getRooms(searchTerm);
                setRooms(data);
            } catch {
                setError('Failed to fetch rooms');
                toast({
                    title: "Error",
                    description: "Failed to fetch rooms",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, [searchTerm, toast]);

    const handleCreateRoom = async (roomData: { name: string; description?: string }) => {
        if (userRole !== 'MANAGER') {
            toast({
                title: "Error",
                description: "Only managers can create rooms",
                variant: "warning",
            });
            return;
        }

        try {
            const newRoom = await roomService.createRoom(roomData);
            setRooms(prev => [...prev, newRoom]);
            toast({
                title: "Success",
                description: "Room created successfully",
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to create room",
                variant: "destructive",
            });
        }
    };

    // const handleDeleteRoom = async (roomId: string) => {
    //     if (userRole !== 'MANAGER') {
    //         toast({
    //             title: "Error",
    //             description: "Only managers can delete rooms",
    //             variant: "warning",
    //         });
    //         return;
    //     }

    //     try {
    //         await roomService.deleteRoom(roomId);
    //         setRooms(prev => prev.filter(room => room.id !== roomId));
    //         toast({
    //             title: "Success",
    //             description: "Room deleted successfully",
    //         });
    //     } catch {
    //         toast({
    //             title: "Error",
    //             description: "Failed to delete room",
    //             variant: "destructive",
    //         });
    //     }
    // };

    // const [objects, setObjects] = useState<any[]>([]);
    
    const [isFetching, setIsFetching] = useState(false);

    const fetchRoomObjects = async (roomId: string, searchTerm: string) => {
        try {
            setIsFetching(true);
            const data = await roomService.getRoomObjects(roomId, searchTerm);
            setObjects(data);
        } catch {
            toast({
                title: "Error",
                description: "Failed to fetch objects",
                variant: "destructive",
            });
        } finally {
            setIsFetching(false);
        }
    };

    // useEffect(() => {
    //     fetchRoomObjects(selectedRoom?.id || '', searchTerm);
    // }, [selectedRoom?.id, searchTerm]);

    // const RoomsList = ({ rooms, onSelectRoom, onCreateRoom, onDeleteRoom, searchTerm, onSearchChange, userRole, isLoading, error }: {
    const RoomsList = ({ rooms, onSelectRoom, searchTerm, onSearchChange }: {
        rooms: Room[];
        onSelectRoom: (room: Room | null) => void;
        searchTerm: string;
        onSearchChange: (searchTerm: string) => void;
        // userRole: string;
        // isLoading: boolean;
        // error: string | null;
    }) => (
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
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    {rooms.map(room => (
                        <Card
                            key={room.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => { onSelectRoom(room); console.log(room, 'room'); fetchRoomObjects(room.id, searchTerm); }}
                        >
                            <CardContent className="p-4" onContextMenu={handleContextMenu}>
                                <div key={room.id} className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">{room.name}</h3>
                                        <p className="text-sm text-gray-500">{room.description}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {room?._count?.objects} items
                                        </p>
                                    </div>
                                    <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {isMenuVisible && (
                        <div
                            style={{
                                position: 'absolute',
                                top: `${menuPosition.y}px`,
                                left: `${menuPosition.x}px`,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                zIndex: 10,
                            }}
                        >
                            <div className='flex flex-col items-center m-0 list-none border rounded-lg outline-none border-gray-200'>
                                <div
                                    className='p-2 cursor-pointer text-blue-500 border-b border-gray-200'
                                    onClick={() => handleMenuItemClick('Edit')}
                                >
                                    Edit
                                </div>
                                <div
                                    className='p-2 cursor-pointer text-red-500'
                                    onClick={() => handleMenuItemClick('Delete')}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* =============Create new room button ============= */}
                {isManager && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                        <Plus className="h-6 w-6" />
                    </button>
                )}
                <CreateRoomModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateRoom}
                />
            </div>
        </div>
    );

    const RoomDetail = ({ room, onBack }: {
        room: Room;
        onBack: () => void;
    }) => {
        const [roomSearchTerm, setRoomSearchTerm] = useState('');
        const [isCreateObjectModalOpen, setIsCreateObjectModalOpen] = useState(false);

        const handleCreateObject = async (objectData: {
            name: string;
            category: 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';
            quantity: number;
            roomId: string;
            description?: string;
        }) => {
            try {
                const formData = new FormData();
                Object.entries(objectData).forEach(([key, value]) => {
                    if (value !== undefined) formData.append(key, value.toString());
                });
                await objectService.createObject(formData);
                toast({
                    title: "Success",
                    description: "Object created successfully",
                });
                setRooms((prevRooms) =>
                    prevRooms.map((item) =>
                        item.id === room.id
                            ? { ...item, _count: { ...item._count, objects: item._count?.objects ? item._count.objects + 1 : 1 } }
                            : item
                    )
                );
                setObjects(prevObjects => [...prevObjects, objectData as unknown as Object]);
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to create object",
                    variant: "destructive",
                });
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Backspace' || e.key === 'Escape') {
                e.preventDefault(); // Prevent default back behavior
            }
        };

        if (isFetching) return <LoadingState />;

        return (
            <div className="h-full flex flex-col" onKeyDown={handleKeyDown}>
                {/* Room Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
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
                        {objects?.map((item: Object) => (
                            <Card key={item.name} className="hover:shadow-md transition-shadow">
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
                {isManager && (
                    <button onClick={() => setIsCreateObjectModalOpen(true)} className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                        <Plus className="h-6 w-6" />
                    </button>
                )}

                <CreateObjectModal
                    isOpen={isCreateObjectModalOpen}
                    onClose={() => setIsCreateObjectModalOpen(false)}
                    roomId={room.id}
                    onSubmit={handleCreateObject}
                />

            </div>
        );
    };

    if (isLoading) return <LoadingState />;
    if (error) return (
        // <ErrorState 
        //     message={error} 
        //     onRetry={() => {
        //         setError(null);
        //         setIsLoading(true);
        //         fetchRooms(); // Retry fetching rooms
        //     }} 
        // />
        <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
        />
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {selectedRoom ? (
                <RoomDetail
                    room={selectedRoom}
                    onBack={() => setSelectedRoom(null)}
                    // userRole={userRole}
                />
            ) : (
                <RoomsList
                    rooms={rooms}
                    onSelectRoom={setSelectedRoom}
                    // onCreateRoom={handleCreateRoom}
                    // onDeleteRoom={handleDeleteRoom}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    // userRole={userRole}
                    // isLoading={isLoading}
                    // error={error}
                />
            )}
        </div>
    );
}