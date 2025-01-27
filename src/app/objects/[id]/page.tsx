'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IoChevronBack} from 'react-icons/io5';
import { BiCube } from 'react-icons/bi';
import { objectService, roomService } from '@/services/api';
import { LoadingState } from '@/components/LoadingState';
import { useToast } from '@/hooks/use-toast';
import { NotFound } from '@/components/NotFound';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader, MoreVertical } from 'lucide-react';
import { ObjectCategory } from '@/types/inventory';
import { objectCategories } from '@/lib/utils';
import { MoveToRoomModal } from '@/components/objects/MoveToRoomModal';
import { Input } from '@/components/ui/input';

interface ObjectDetails {
  id: string;
  name: string;
  category: ObjectCategory;
  quantity: number;
  description?: string;
  roomId: string;
  room: Room;
  createdAt: Date;
  updatedAt: Date;
}

interface Room {
  id: string;
  name: string;
}

export default function ObjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [object, setObject] = useState<ObjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<'object' | 'quantity' | null>(null);
  const [editedObject, setEditedObject] = useState<ObjectDetails | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { toast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteNote, setDeleteNote] = useState('');
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isMoveToRoom, setIsMoveToRoom] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Replace with actual API call
    const fetchObject = async () => {
      try {
        const response = await objectService.getObjectById(params.id as string);
        setObject(response);
      } catch {
        setIsLoading(false);
        console.error('Error fetching object:');
      } finally {
        setIsLoading(false);
      }
    };

    fetchObject();
  }, [params.id]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await roomService.getRooms();
      setRooms(roomsData);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (object) {
      setEditedObject({
        ...object,
        roomId: object.roomId || '',  // Ensure roomId is set
      });
    }
  }, [object]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (!editedObject) return;
    if (!object) return;
    if (editedObject.quantity < object.quantity) {
      toast({
        title: "Error",
        description: "Quantity cannot be less than original quantity",
        variant: "destructive",
      });
      return;
    } else if (isEditing === 'quantity' && editedObject.quantity > object.quantity) {
      try {
        setIsLoading(true);
        await objectService.updateQuantity(object?.id as string, editedObject.quantity);
        setObject({ ...editedObject, room: rooms.find(room => room.id === editedObject.roomId) as Room });
        setIsEditing(null);
        setObject(prevObject =>
          prevObject ? {
            ...prevObject,
            quantity: editedObject.quantity
          } : null
        );
        toast({
          title: "Success",
          description: "Object updated successfully",
          variant: "success",
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to update object",
          variant: "destructive",
        });
        return;
      } finally {
        setIsLoading(false);
      }
    } else if (isEditing === 'object') {
      try {
        setIsLoading(true);
        await objectService.updateObject(object?.id as string, editedObject);
        setObject({ ...editedObject, room: rooms.find(room => room.id === editedObject.roomId) as Room });
        setIsEditing(null);
        toast({
          title: "Success",
          description: "Object updated successfully",
          variant: "success",
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to update object",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setEditedObject(object);
    setIsEditing(null);
  };

  const handleInputChange = (field: keyof ObjectDetails, value: string | number | ObjectCategory | string) => {
    setEditedObject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleDeleteClick = () => {
    setDeleteNote('');
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteNote.trim()) {
      toast({
        title: "Error",
        description: "Please provide a deletion note",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleteLoading(true);
      await objectService.removeObject(object?.id as string, quantity, deleteNote);
      setObject(prevObject =>
        prevObject ? {
          ...prevObject,
          quantity: prevObject.quantity - quantity
        } : null
      );
      toast({
        title: "Success",
        description: `Object removed successfully`,
      });

      setIsDeleteModalOpen(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete objects",
        variant: "destructive",
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleMoveSuccess = (objectId: string, movedQuantity: number) => {
    setObject(prevObject =>
      prevObject ? {
        ...prevObject,
        quantity: prevObject.quantity - movedQuantity
      } : null
    );
  };

  if (isLoading) {
    return <LoadingState />
  }

  if (!object) {
    return <NotFound />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

        <MoveToRoomModal
          isOpen={isMoveToRoom}
          onClose={() => setIsMoveToRoom(false)}
          objectId={object.id}
          currentQuantity={object.quantity}
          rooms={rooms}
          currentRoomId={object.roomId}
          onMoveSuccess={(quantity) => handleMoveSuccess(object.id, quantity)}
        />

        <div
          className="inline-flex items-center relative hover:text-blue-600 mb-6 flex-row justify-between w-full"
        >
          <button onClick={() => router.back()} className="flex items-center text-blue-500">
            <IoChevronBack className="w-5 h-5 mr-1" />
            Back to Objects
          </button>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="ml-auto p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </button>
          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute right-0 top-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsMoveToRoom(true);
                    setShowOptions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Move to Room
                </button>
                <button
                  onClick={() => {
                    setIsEditing('object');
                    setShowOptions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
                >
                  Modify Object
                </button>
                <button
                  onClick={() => {
                    setIsEditing('quantity');
                    setShowOptions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
                >
                  Update quantity
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick();
                    setShowOptions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Remove Object
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BiCube className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{object.name}</h1>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span>{object.category}</span>
                  <span className="mx-2">•</span>
                  <span>{object.room.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing && (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing === 'object' ? (
                  <input
                    type="text"
                    value={editedObject?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value as string)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="text-gray-900">{object.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                {isEditing === 'object' ? (
                  <select
                    value={editedObject?.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value as ObjectCategory)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {
                      objectCategories.map((category) => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))
                    }
                  </select>
                ) : (
                  <div className="text-gray-900">{object.category}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                {isEditing === 'quantity' ? (
                  <input
                    type="number"
                    min={object.quantity}
                    value={editedObject?.quantity}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value < object.quantity) {
                        handleInputChange('quantity', object.quantity);
                      } else {
                        handleInputChange('quantity', value);
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      // Prevent typing non-numeric characters
                      if (!/[\d\b]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                      }

                      // Prevent if resulting value would be less than original quantity
                      const currentValue = String(editedObject?.quantity || '');
                      const newValue = e.key === 'Backspace'
                        ? currentValue.slice(0, -1)
                        : currentValue + e.key;

                      if (Number(newValue) < object.quantity && !['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                ) : (
                  <div className="text-gray-900">{object.quantity}</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                {isEditing === 'object' ? (
                  <textarea
                    value={editedObject?.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value as string)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                ) : (
                  <div className="text-gray-900">{object.description || '-'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                {/* {isEditing === 'object' ? (
                  <select
                    value={editedObject?.roomId || ''}
                    onChange={(e) => handleInputChange('roomId', e.target.value as string)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                ) : ( */}
                <div className="text-gray-900">{object.room.name}</div>
                {/* )} */}
              </div>

              <div>
                <h2 className="font-medium text-gray-900 mb-2">History</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Created</dt>
                    <dd className="text-gray-900">
                      {new Date(object.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Last Updated</dt>
                    <dd className="text-gray-900">
                      {new Date(object.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Confirmation</DialogTitle>
          </DialogHeader>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Please input the quantity to remove
          </label>
          <Input
            type="number"
            min={1}
            max={object.quantity}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > object.quantity) {
                setQuantity(object.quantity);
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
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please provide a reason for removal
            </label>
            <Textarea
              placeholder="e.g., Wine bottle consumed during event"
              value={deleteNote}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDeleteNote(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
              disabled={isDeleteLoading}
            >
              Cancel
            </button>
            <button
              onClick={() => handleConfirmDelete()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                'Confirm Delete'
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 