import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';
import { objectService } from '@/services/api';
import { roomService } from '@/services/api';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

interface SearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (id: string, type: 'objects' | 'rooms') => void;
}

function SearchSkeleton() {
    return (
        <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-2 p-2 animate-pulse">
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

interface Object {
    id: string;
    name: string;
    category: string;
    description: string;
    roomName: string;
}

interface Room {
    id: string;
    name: string;
    description: string;
}

export function SearchModal({ open, onOpenChange, onSelect }: SearchModalProps) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [activeTab, setActiveTab] = React.useState<'objects' | 'rooms'>('objects');
    const [isLoading, setIsLoading] = React.useState(true);
    const [objects, setObjects] = React.useState<Object[]>([]);
    const [rooms, setRooms] = React.useState<Room[]>([]);
    
    const { toast } = useToast();

    const { data: session } = useSession();
    const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
    const isManager = userRole === 'MANAGER';

    const fetchObjects = async () => {
        const response = await objectService.getObjects();
        setObjects(response as Object[] || []);
        setIsLoading(false);
    };

    const fetchRooms = async () => {
        const rooms = await roomService.getRooms();
        setRooms(rooms as Room[] || []);
        setIsLoading(false);
    };

    useEffect(() => {
        if (open) {
            setIsLoading(true);
            if (activeTab === 'objects') {
                fetchObjects();
            } else if (activeTab === 'rooms') {
                fetchRooms();
            }
        }
    }, [open, activeTab]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Type to search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                        disabled={isLoading}
                    />
                </div>

                <Tabs defaultValue="objects" className="w-full" onValueChange={(value) => setActiveTab(value as 'objects' | 'rooms')}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="objects" disabled={isLoading}>Objects</TabsTrigger>
                        <TabsTrigger value="rooms" disabled={isLoading}>Rooms</TabsTrigger>
                    </TabsList>

                    <TabsContent value="objects">
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4 outline-none">
                            {isLoading ? (
                                <SearchSkeleton />
                            ) : (
                                <div className="space-y-2">
                                    {/* Replace with your actual objects data */}
                                    {objects.map((object, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg cursor-pointer justify-between"
                                            onClick={() => {
                                                onSelect(object.id, 'objects');
                                            }}
                                        >
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{object.name}</p>
                                                <p className="text-sm text-muted-foreground">{object.category}</p>
                                                <p className="text-sm text-muted-foreground">{object.description}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">{object.roomName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="rooms">
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            {isLoading ? (
                                <SearchSkeleton />
                            ) : (
                                <div className="space-y-2">
                                    {/* Replace with your actual rooms data */}
                                    {rooms.map((room, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg cursor-pointer"
                                            onClick={() => {
                                                if (isManager) {
                                                    onSelect(room.id, 'rooms');
                                                } else {
                                                    toast({
                                                        title: 'You are not authorized to access this room \n Please contact your manager',
                                                        variant: 'destructive',
                                                    });
                                                }
                                            }}
                                        >
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{room.name}</p>
                                                <p className="text-sm text-muted-foreground">{room.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
} 