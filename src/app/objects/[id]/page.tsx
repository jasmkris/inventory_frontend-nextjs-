'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IoChevronBack, IoPencil, IoTrash } from 'react-icons/io5';
import { BiCube } from 'react-icons/bi';
import { objectService, roomService } from '@/services/api';
import { LoadingState } from '@/components/LoadingState';
import { useToast } from '@/hooks/use-toast';
import { NotFound } from '@/components/NotFound';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from 'lucide-react';

interface ObjectDetails {
  id: string;
  name: string;
  category: 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedObject, setEditedObject] = useState<ObjectDetails | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { toast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteNote, setDeleteNote] = useState('');
  const [objectToDelete, setObjectToDelete] = useState<string[]>([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

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

  const handleDelete = async () => {
    // if (!confirm('Are you sure you want to delete this object?')) return;
    // let objectIds = await [object?.id as string];
    // setIsDeleting(true);
    // try {
    //   await objectService.multipleObjectsDelete(objectIds);
    //   router.back();
    // } catch (error) {
    //   console.error('Error deleting object:', error);
    //   setIsDeleting(false);
    // }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedObject) return;

    try {
      setIsLoading(true);
      // const formData = new FormData();
      // Object.entries(editedObject).forEach(([key, value]) => {
      //   if (value !== undefined && value !== null) {
      //     formData.append(key, value.toString());
      //   }
      // });

      await objectService.updateObject(object?.id as string, editedObject);
      setObject({ ...editedObject, room: rooms.find(room => room.id === editedObject.roomId) as Room });
      setIsEditing(false);
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
  };

  const handleCancel = () => {
    setEditedObject(object);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ObjectDetails, value: string | number | 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER' | string) => {
    setEditedObject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  if (isLoading) {
    return <LoadingState />
  }

  if (!object) {
    return <NotFound />;
  }

  const handleDeleteClick = () => {
    // setObjectToDelete(objectIds);
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
      // await objectService.multipleObjectsDelete(objectToDelete, deleteNote);
      
      toast({
        title: "Success",
        description: `${objectToDelete.length} objects deleted successfully`,
      });

      setSelectedObjects([]);
      setIsSelectionMode(false);
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


  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <IoChevronBack className="w-5 h-5 mr-1" />
          Back to Objects
        </button>

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
              {isEditing ? (
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
              ) : (
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IoPencil className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => handleDeleteClick()}
                disabled={isDeleting}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <IoTrash className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
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
                {isEditing ? (
                  <select
                    value={editedObject?.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value as 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER')}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CONSUMABLE">Consumable</option>
                    <option value="TEXTILE">Textile</option>
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="OTHER">Other</option>
                  </select>
                ) : (
                  <div className="text-gray-900">{object.category}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={editedObject?.quantity || 0}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="text-gray-900">{object.quantity}</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                {isEditing ? (
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
                {isEditing ? (
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
                ) : (
                  <div className="text-gray-900">{object.room.name}</div>
                )}
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
            <DialogTitle>Delete Confirmation</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please provide a reason for deletion
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
              onClick={handleConfirmDelete}
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