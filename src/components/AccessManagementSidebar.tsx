'use client';

import { useState } from 'react';
import { IoClose, IoPerson } from 'react-icons/io5';
import { FiCheck, FiX } from 'react-icons/fi';
<<<<<<< HEAD
import { useToast } from '@/hooks/use-toast';
=======
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be

interface User {
  id: string;
  name: string;
  email: string;
  role: 'MANAGER' | 'EMPLOYEE';
  status: 'PENDING' | 'ACTIVE' | 'REJECTED';
}

interface AccessManagementSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole: 'MANAGER' | 'EMPLOYEE';
}

export default function AccessManagementSidebar({
  isOpen,
  onClose,
  currentUserRole,
}: AccessManagementSidebarProps) {
<<<<<<< HEAD
  const { toast } = useToast();

=======
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
  const [inviteLink, setInviteLink] = useState('');
  const [pendingUsers, setPendingUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      role: 'EMPLOYEE',
      status: 'PENDING',
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'EMPLOYEE',
      status: 'PENDING',
    },
  ]);

  const [activeUsers, setActiveUsers] = useState<User[]>([
    {
      id: '3',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'EMPLOYEE',
      status: 'ACTIVE',
    },
    {
      id: '4',
      name: 'Mike Brown',
      email: 'mike@example.com',
      role: 'MANAGER',
      status: 'ACTIVE',
    },
  ]);

  const handleGenerateInviteLink = () => {
    // Generate a unique invite link
    const newLink = `${window.location.origin}/register?invite=${Date.now()}`;
    setInviteLink(newLink);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
<<<<<<< HEAD
    toast({
      title: "Copied",
      description: "Invite link copied to clipboard",
      variant: "success",
    });
=======
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
  };

  const handleApproveUser = (userId: string) => {
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    const approvedUser = pendingUsers.find((user) => user.id === userId);
    if (approvedUser) {
      setActiveUsers((prev) => [...prev, { ...approvedUser, status: 'ACTIVE' }]);
    }
  };

  const handleRejectUser = (userId: string) => {
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleRevokeAccess = (userId: string) => {
    setActiveUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Only managers can see and use this component
  if (currentUserRole !== 'MANAGER') {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
<<<<<<< HEAD
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
=======
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Access Management</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Invite New User Button */}
          <button
            onClick={handleGenerateInviteLink}
            className="w-full py-3 px-4 mb-6 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <IoPerson className="w-5 h-5" />
            Invite New User
          </button>

          {/* Invite Link Display */}
          {inviteLink && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Invitation Link:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 text-sm p-2 border rounded"
                />
                <button
                  onClick={handleCopyInviteLink}
<<<<<<< HEAD
                  className="p-2 text-blue-500 hover:text-blue-600 border border-blue-200 rounded-md"
=======
                  className="p-2 text-blue-500 hover:text-blue-600"
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Pending Access Requests */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Pending Access Requests</h3>
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveUser(user.id)}
<<<<<<< HEAD
                      className="p-2 text-green-500 hover:bg-green-50 rounded-full bg-background border border-green-500"
=======
                      className="p-2 text-green-500 hover:bg-green-50 rounded-full"
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRejectUser(user.id)}
<<<<<<< HEAD
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full bg-background border border-red-500"
=======
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Users */}
          <div>
            <h3 className="text-lg font-medium mb-4">Active Users</h3>
            <div className="space-y-4">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  {user.role !== 'MANAGER' && (
                    <button
                      onClick={() => handleRevokeAccess(user.id)}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      Revoke Access
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 