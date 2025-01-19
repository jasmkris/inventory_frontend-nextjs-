'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { useState } from 'react';

interface RoomActionsProps {
  roomId: number;
  onEdit: () => void;
  onDelete: () => void;
}

// export function RoomActions({ roomId, onEdit, onDelete }: RoomActionsProps) {
export function RoomActions({ onEdit, onDelete }: RoomActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="relative">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="h-5 w-5" />
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-2">
          <button
            onClick={onEdit}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Room
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete Room
          </button>
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this room? This action cannot be undone.</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setShowDeleteDialog(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowDeleteDialog(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 