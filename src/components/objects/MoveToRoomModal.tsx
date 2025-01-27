'use client';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { objectService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface Room {
    id: string;
    name: string;
}

interface MoveToRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    objectId: string;
    currentQuantity: number;
    rooms: Room[];
    currentRoomId: string;
    onMoveSuccess: (movedQuantity: number) => void;
}

export function MoveToRoomModal({ isOpen, onClose, objectId, currentQuantity, rooms, currentRoomId, onMoveSuccess }: MoveToRoomModalProps) {

    const [selectedRoom, setSelectedRoom] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleMove = async () => {
        try {
            setIsLoading(true);
            await objectService.moveObject(objectId, selectedRoom, quantity);
            toast({
                title: "Success",
                description: "Object moved successfully",
            });
            onMoveSuccess(quantity);
            onClose();
        } catch {
            toast({
                title: "Error",
                description: "Failed to move object",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Move Object to Room</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Quantity</label>
                        <Input
                            type="number"
                            min={1}
                            max={currentQuantity}
                            value={quantity}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (value > currentQuantity) {
                                    setQuantity(currentQuantity);
                                } else if (value < 1) {
                                    setQuantity(1);
                                } else {
                                    setQuantity(value);
                                }
                            }}
                            onKeyDown={(e) => {
                                // Prevent typing non-numeric characters
                                if (!/[\d\b]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Room</label>
                        <Select value={selectedRoom} onValueChange={setSelectedRoom} disabled={isLoading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a room" />
                            </SelectTrigger>
                            <SelectContent>
                                {rooms.map((room: { id: string; name: string }) => (
                                    <SelectItem 
                                        key={room.id} 
                                        value={room.id}
                                        disabled={room.id === currentRoomId}
                                    >
                                        {room.name} {room.id === currentRoomId && '(Current)'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleMove}
                        disabled={!selectedRoom || quantity < 1 || isLoading}
                    >
                        {isLoading ? 'Moving...' : 'Move'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 