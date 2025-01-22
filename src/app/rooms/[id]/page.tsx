'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';
import { useToast } from '@/hooks/use-toast';
import { roomService } from '@/services/api';
import type { Room } from '@/types';
import { LoadingState } from '@/components/LoadingState';
import { NotFound } from '@/components/NotFound';

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [room, setRoom] = useState<Room | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editedRoom, setEditedRoom] = useState<Partial<Room>>({});

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await roomService.getRoomById(params.id as string);
        setRoom(data);
        setEditedRoom(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch room details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [params.id, toast]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response: any = await roomService.updateRoom(params.id as string, editedRoom);
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: response.data.message ? response.data.message : response?.error,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update room",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingState />;
  if (!room) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Link href="/rooms" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <IoChevronBack className="w-5 h-5 mr-1" />
        Back to Rooms
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? (
              <input
                type="text"
                value={editedRoom.name}
                onChange={(e) => setEditedRoom({ ...editedRoom, name: e.target.value })}
                className="border rounded px-2 py-1"
              />
            ) : (
              room.name
            )}
          </h1>
          <div className="space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditedRoom(room);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            {isEditing ? (
              <textarea
                value={editedRoom.description || ''}
                onChange={(e) => setEditedRoom({ ...editedRoom, description: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm"
                rows={3}
              />
            ) : (
              <p className="mt-1 text-gray-900">{room.description || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Transit Room</label>
            {isEditing ? (
              <input
                type="checkbox"
                checked={editedRoom.isTransit}
                onChange={(e) => setEditedRoom({ ...editedRoom, isTransit: e.target.checked })}
                className="mt-1 rounded border-gray-300"
              />
            ) : (
              <p className="mt-1 text-gray-900">{room.isTransit ? 'Yes' : 'No'}</p>
            )}
          </div>

          <div>
            <h2 className="font-medium text-gray-900">Details</h2>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Created</dt>
                <dd className="text-gray-900">
                  {new Date(room.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Last Updated</dt>
                <dd className="text-gray-900">
                  {new Date(room.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 