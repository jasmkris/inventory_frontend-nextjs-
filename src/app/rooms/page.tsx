'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import {
    Search,
    Filter,
    Plus,
    ChevronLeft,
    MoreVertical,
    Package,
    Loader
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
    SheetDescription,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { RoomFilter } from '@/components/RoomFilter';
// import { RoomActions } from '@/components/RoomActions';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { objectService, roomService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { CreateRoomModal } from '@/components/rooms/CreateRoomModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateObjectModal } from '@/components/objects/CreateObjectModal';
import { Button } from '@/components/ui/button';
import NotData from '@/components/NotData';

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

const SearchInput = ({ value, onChange }: {
    value: string;
    onChange: (value: string) => void
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="relative flex-1">
            <input
                ref={inputRef}
                type="search"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
    );
};

export default function RoomsPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [objects, setObjects] = useState<Object[]>([]);
    // const userRole = session?.user?.role || 'EMPLOYEE';
    const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
    const isManager = userRole === 'MANAGER';
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // ============= Fetch rooms =============

    // Fetch rooms only once on component mount
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setIsLoading(true);
                const data: any = await roomService.getRooms();
                setRooms(data);
            } catch {
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
    }, []); // Remove searchTerm dependency

    const filteredRooms = useMemo(() =>
        rooms.filter(room =>
            room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.description?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [rooms, searchTerm]
    );

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
            const newRoom: any = await roomService.createRoom(roomData);
            if (newRoom.error) {
                toast({
                    title: "Error",
                    description: newRoom.error,
                    variant: "destructive",
                });
            } else {
                setRooms(prev => [...prev, newRoom.data]);
                toast({
                    title: "Success",
                    description: "Room created successfully",
                });
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to create room",
                variant: "destructive",
            });
        }
    };

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
    }) => {

        const [isMenuVisible, setIsMenuVisible] = useState(false);
        const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
        const menuRef = useRef<HTMLDivElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);

        // Close menu when clicking outside
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                // Skip if menu is not visible
                if (!isMenuVisible) return;

                const target = e.target as Node;
                const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
                const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);

                if (isOutsideMenu && isOutsideButton) {
                    setIsMenuVisible(false);
                    setSelectedRoomId(null);
                }
            };

            // Use mousedown instead of click
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [isMenuVisible]); // Add isMenuVisible to dependencies

        const handleOptionsClick = (e: React.MouseEvent, roomId: string) => {
            e.preventDefault();
            e.stopPropagation();

            // Toggle menu for clicked room, close for others
            if (selectedRoomId === roomId) {
                setIsMenuVisible(!isMenuVisible);
            } else {
                setSelectedRoomId(roomId);
                setIsMenuVisible(true);
            }
        };

        const handleMenuItemClick = async (action: string) => {
            if (!selectedRoomId) return;
            console.log(`Action selected: ${action}, ${selectedRoomId}`);
            setIsLoading(true);
            if (action === 'Edit') {
                router.push(`/rooms/${selectedRoomId}`);
                // setIsMenuVisible(false); // Hide the menu after selection
                // setSelectedRoomId(null);

            } else if (action === 'Delete') {
                try {
                    const response: any = await roomService.deleteRoom(selectedRoomId as string);
                    if (response.error) {
                        toast({
                            title: "Error",
                            description: response.error,
                            variant: "destructive",
                        });
                    } else {
                        setRooms(prev => prev.filter(room => room.id !== selectedRoomId));
                        toast({
                            title: "Success",
                            description: response.data.message ? response.data.message : response?.error,
                        });
                    }
                } catch {
                    toast({
                        title: "Error",
                        description: "Failed to delete room",
                        variant: "destructive",
                    });
                }
            }
            setIsMenuVisible(false); // Hide the menu after selection
            setSelectedRoomId(null);
            setIsLoading(false);
        };

        return (
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
                        <SearchInput
                            value={searchTerm}
                            onChange={onSearchChange}
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredRooms.length === 0 ? (
                            <NotData />
                        ) : (
                            filteredRooms.map(room => (
                                <Card
                                    key={room.id}
                                    className="hover:shadow-md transition-shadow"
                                >
                                    <CardContent
                                        className="p-4"
                                    >
                                        <div key={room.id} className="flex items-center justify-between">
                                            <div onClick={() => { onSelectRoom(room); fetchRoomObjects(room.id, searchTerm); }} className="cursor-pointer">
                                                <h3 className="font-medium">{room.name} {room.isTransit ? <span className="text-red-500 animate-pulse">Transit</span> : ''}</h3>
                                                <p className="text-sm text-gray-500">{room.description}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {room?._count?.objects} items
                                                </p>
                                            </div>
                                            <button
                                                ref={buttonRef}
                                                // onClick={() => setShowOptions(!showOptions)}
                                                onClick={(e) => handleOptionsClick(e, room.id)}
                                                className="ml-auto p-2 hover:bg-gray-100 rounded-full">
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                            <div className="relative">
                                                {isMenuVisible && selectedRoomId === room.id && (
                                                    <div
                                                        ref={menuRef}
                                                        className="absolute right-0 top-5 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[100px]"
                                                    >
                                                        <div className='flex flex-col w-full'>
                                                            <div
                                                                className='w-full cursor-pointer p-2 text-left text-blue-500 hover:bg-gray-50 border-b border-gray-200'
                                                                onClick={() => handleMenuItemClick('Edit')}
                                                            >
                                                                Edit
                                                            </div>
                                                            <div
                                                                className='w-full cursor-pointer p-2 text-left text-red-500 hover:bg-gray-50'
                                                                onClick={() => handleMenuItemClick('Delete')}
                                                            >
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
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
    };

    const RoomDetail = ({ room, onBack }: {
        room: Room;
        onBack: () => void;
    }) => {
        const [roomSearchTerm, setRoomSearchTerm] = useState('');
        const [isCreateObjectModalOpen, setIsCreateObjectModalOpen] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
        const [sortBy, setSortBy] = useState<'name' | 'quantity'>('name');
        const [showOptions, setShowOptions] = useState(false);
        const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
        const [isSelectionMode, setIsSelectionMode] = useState(false);
        const [isFilterOpen, setIsFilterOpen] = useState(false);

        const optionsRef = useRef<HTMLDivElement>(null);
        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                    setShowOptions(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

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

        const filteredAndSortedObjects = useMemo(() => {
            return objects
                .filter(obj => {
                    const matchesSearch = obj.name.toLowerCase().includes(roomSearchTerm.toLowerCase());
                    const matchesCategory = selectedCategory === 'ALL' || obj.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                })
                .sort((a, b) => {
                    if (sortBy === 'name') {
                        return a.name.localeCompare(b.name);
                    }
                    return b.quantity - a.quantity;
                });
        }, [objects, roomSearchTerm, selectedCategory, sortBy]);

        // const handleKeyDown = (e: React.KeyboardEvent) => {
        //     if (e.key === 'Backspace' || e.key === 'Escape') {
        //         e.preventDefault(); // Prevent default back behavior
        //     }
        // };

        const handleDeleteRoom = async () => {
            try {
                setIsLoading(true);
                const response: any = await objectService.allObjectsDelete(room.id);
                if (response.error) {
                    toast({
                        title: "Error",
                        description: response.error,
                        variant: "destructive",
                    });
                } else {
                    await setRooms(prevRooms =>
                        prevRooms.map(r =>
                            r.id === room.id
                                ? {
                                    ...r,
                                    _count: {
                                        ...r._count,
                                        objects: 0
                                    }
                                }
                                : r
                        )
                    );
                    toast({
                        title: "Success",
                        description: response.data.message ? response.data.message : response?.error + ' Totally ' + response?.data?.deletedCount + ' objects deleted',
                    });
                    onBack();
                }
                setIsLoading(false);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete room",
                    variant: "destructive",
                });
            }
        };

        const [isDeleteLoading, setIsDeleteLoading] = useState(false);
        const handleDeleteSelectedObjects = async () => {
            try {
                setIsDeleteLoading(true);
                await objectService.multipleObjectsDelete(selectedObjects as string[])
                toast({
                    title: "Success",
                    description: `${selectedObjects.length} objects deleted successfully`,
                });
                await setObjects(filteredAndSortedObjects.filter(obj => !selectedObjects.includes(obj.id)));

                // Update room's object count in parent component
                setRooms(prevRooms =>
                    prevRooms.map(r =>
                        r.id === room.id
                            ? {
                                ...r,
                                _count: {
                                    ...r._count,
                                    objects: (r._count?.objects || 0) - selectedObjects.length
                                }
                            }
                            : r
                    )
                );
                setSelectedObjects([]);
                setIsSelectionMode(false);
                setIsDeleteLoading(false);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete objects",
                    variant: "destructive",
                });
                setIsDeleteLoading(false);
            }
        };

        if (isFetching) return <LoadingState />;

        return (
            // <div className="h-full flex flex-col" onKeyDown={handleKeyDown}>
            <div className="h-full flex flex-col">
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
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="ml-auto p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                        {showOptions && (
                            <div
                                ref={optionsRef}
                                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                            >
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setIsSelectionMode(!isSelectionMode);
                                            setShowOptions(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {isSelectionMode ? 'Cancel Selection' : 'Select Objects'}
                                    </button>
                                    <button
                                        onClick={handleDeleteRoom}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Delete All Objects
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Room Content */}
                <div className="p-4">
                    {/* Search and Filter */}

                    <div className="flex items-center gap-2 mb-4">
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <div className="flex items-center justify-center gap-2 flex-1">
                                <SearchInput
                                    value={roomSearchTerm}
                                    onChange={setRoomSearchTerm}
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
                                                <SelectItem value="ALL">All Categories</SelectItem>
                                                <SelectItem value="CONSUMABLE">Consumable</SelectItem>
                                                <SelectItem value="TEXTILE">Textile</SelectItem>
                                                <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
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

                    {/* Items List */}
                    <div className="space-y-3">
                        {isSelectionMode && selectedObjects.length > 0 && (
                            <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
                                <span>{selectedObjects.length} objects selected</span>
                                <button
                                    onClick={handleDeleteSelectedObjects}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    disabled={isDeleteLoading}
                                >
                                    {isDeleteLoading ? 'Deleting...' : 'Delete Selected'}
                                </button>
                            </div>
                        )}
                        {filteredAndSortedObjects.length === 0 ? (
                            <NotData />
                        ) : (
                            filteredAndSortedObjects?.map((item: Object) => (
                                <Card key={item.name} className={`relative ${isSelectionMode ? 'cursor-pointer' : 'cursor-pointer'
                                    }`}
                                    onClick={() => {
                                        if (isSelectionMode) {
                                            if (isDeleteLoading) return;
                                            setSelectedObjects(prev =>
                                                prev.includes(item.id)
                                                    ? prev.filter(id => id !== item.id)
                                                    : [...prev, item.id]
                                            );
                                        } else {
                                            router.push(`/objects/${item.id}`);
                                        }
                                    }}
                                >
                                    {isSelectionMode && !isDeleteLoading ? (
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <input
                                                type="checkbox"
                                                checked={selectedObjects.includes(item.id)}
                                                onChange={() => { }} // Handled by Card click
                                                className="h-5 w-5 rounded border-gray-300"
                                                disabled={isDeleteLoading}
                                            />
                                        </div>
                                    ) : (
                                        isDeleteLoading && selectedObjects.includes(item.id) ? (
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <Loader className="h-5 w-5" /> {/* Loading spinner */}
                                            </div>
                                        ) : null
                                    )}

                                    <CardContent className={`p-4 ${isSelectionMode ? 'pl-12' : ''}`}>
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
                            ))
                        )}
                    </div>
                </div>

                {/* Add Item Button (Only visible to managers) */}
                {/* {isManager && ( */}
                <button onClick={() => setIsCreateObjectModalOpen(true)} className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                    <Plus className="h-6 w-6" />
                </button>
                {/* )} */}

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