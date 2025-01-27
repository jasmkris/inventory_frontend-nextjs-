'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DeleteRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  onDelete: () => Promise<void>;
}

export function DeleteRoomModal({ isOpen, onClose, roomName, onDelete }: DeleteRoomModalProps) {
  const [verificationText, setVerificationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const expectedText = 'delete ' + roomName; // Or you could use "delete my room"
  const isVerified = verificationText === expectedText;

  const handleDelete = async () => {
    if (!isVerified) return;

    try {
      setIsLoading(true);
      await onDelete();
      toast({
        title: "Success",
        description: "Room deleted successfully",
      });
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete room",
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
          <DialogTitle>Delete Room</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            This room will be deleted, along with all of its objects and settings.
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <span className="text-sm text-red-600">
              Warning: This action is not reversible. Please be certain.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700">
              To verify, type <span className="font-medium">{expectedText}</span> below:
            </label>
            <Input
              value={verificationText}
              onChange={(e) => setVerificationText(e.target.value)}
              placeholder={`Type ${expectedText} to confirm`}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isVerified || isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Room"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 