'use client';

import { useState, useEffect } from 'react';
import { IoClose, IoPerson } from 'react-icons/io5';
import { FiCheck, FiX } from 'react-icons/fi';
import { useToast } from '@/hooks/use-toast';
import { userService } from '@/services/api';
import { Skeleton } from "@/components/ui/skeleton";
import NotData from '@/components/NotData';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'MANAGER' | 'EMPLOYEE';
  isVerified: boolean;
  photoUrl: string;
}

interface AccessManagementSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole: 'MANAGER' | 'EMPLOYEE';
}

const imageURI = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function AccessManagementSidebar({
  isOpen,
  onClose,
  currentUserRole,
}: AccessManagementSidebarProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [inviteLink, setInviteLink] = useState('');
  const [isInviteLinkCopied, setIsInviteLinkCopied] = useState(false);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [isInviteButtonShown, setIsInviteButtonShown] = useState(false);
  const [isPendingApprovalLoading, setIsPendingApprovalLoading] = useState(false);

  const getPendingUsers = async () => {
    const response = await userService.getPendingUsers();
    if (response) {
      setActiveUsers(response.filter((user: User) => user.isVerified === true));
      setPendingUsers(response.filter((user: User) => user.isVerified === false));
    }
  };

  useEffect(() => {
    getPendingUsers().finally(() => setIsLoading(false));
  }, []);

  const handleGenerateInviteLink = () => {
    // Generate a unique invite link
    const newLink = `${window.location.origin}/login?invite=${Date.now()}`;
    setInviteLink(newLink);
    setIsInviteLinkCopied(false);
    setIsInviteButtonShown(!isInviteButtonShown);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsInviteLinkCopied(true);
    setTimeout(() => {
      setIsInviteLinkCopied(false);
    }, 1000);
  };

  const [pendingUserId, setPendingUserId] = useState('');
  const handleApproveUser = async (userId: string) => {
    setPendingUserId(userId)
    setIsPendingApprovalLoading(true);
    await userService.approveUser(userId);
    toast({
      title: "Success",
      description: "User approved successfully",
    });
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    const approvedUser = pendingUsers.find((user) => user.id === userId);
    if (approvedUser) {
      setActiveUsers((prev) => [...prev, { ...approvedUser, isVerified: true }]);
    }
    setIsPendingApprovalLoading(false);
    setPendingUserId('');
  };

  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const handleRejectUser = async (userId: string) => {
    setPendingUserId(userId)
    setIsRejectLoading(true);
    await userService.rejectUser(userId);
    toast({
      title: "Success",
      description: "User rejected successfully",
    });
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    setIsRejectLoading(false);
    setPendingUserId('');
  };

  const [isRevokeLoading, setIsRevokeLoading] = useState(false);
  const handleRevokeAccess = async (userId: string) => {
    setPendingUserId(userId)
    setIsRevokeLoading(true);
    await userService.revokeAccess(userId);
    toast({
      title: "Success",
      description: "User revoked successfully",
    });
    const revokedUser = await activeUsers.find((user) => user.id === userId);
    if (revokedUser) {
      setPendingUsers((prev) => [...prev, { ...revokedUser, isVerified: false }]);
      setActiveUsers((prev) => prev.filter((user) => user.id !== userId));
    }
    setIsRevokeLoading(false);
    setPendingUserId('');
  };

  // Only managers can see and use this component
  if (currentUserRole !== 'MANAGER') {
    return null;
  }

  const handleViewUser = (photoUrl: string) => {
    window.open(imageURI + photoUrl, '_blank');
  };

  const UserSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" /> {/* Name */}
        <Skeleton className="h-3 w-40" /> {/* Email */}
        <Skeleton className="h-3 w-24" /> {/* Role */}
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-full" /> {/* Approve button */}
        <Skeleton className="h-8 w-8 rounded-full" /> {/* Reject button */}
      </div>
    </div>
  );

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
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
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
          {inviteLink && isInviteButtonShown && (
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
                  className={`p-2 text-blue-500 h-[38px] flex items-center justify-center hover:text-blue-600 border border-blue-200 rounded-md ${isInviteLinkCopied ? 'bg-blue-500 text-white' : ''}`}
                >
                  {isInviteLinkCopied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {/* Pending Access Requests */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Pending Access Requests</h3>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                </>
              ) : pendingUsers.length === 0 ? (
                <NotData />
              ) : (
                pendingUsers.map((user) => (
                  isPendingApprovalLoading && pendingUserId === user.id ? (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium animate-pulse animate-infinite animate-slow animate-ease-in-out animate-delay-1000 animate-repeat-1000">Approving...</p>
                      </div>
                    </div>
                  ) : isRejectLoading && pendingUserId === user.id ? (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium animate-pulse animate-infinite animate-slow animate-ease-in-out animate-delay-1000 animate-repeat-1000">Rejecting...</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-red-600 cursor-pointer animate-pulse animate-infinite animate-slow animate-ease-in-out animate-delay-1000 animate-repeat-1000" onClick={() => handleViewUser(user.photoUrl)}>{user.firstName.toLocaleUpperCase()} {user.lastName.toLocaleUpperCase()}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveUser(user.id)}
                          title='Approve user'
                          className="p-2 text-green-500 hover:bg-green-50 rounded-full bg-background border border-green-500"
                        >
                          <FiCheck className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRejectUser(user.id)}
                          title='Reject and delete user'
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full bg-background border border-red-500"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>

          {/* Active Users */}
          <div>
            <h3 className="text-lg font-medium mb-4">Active Users</h3>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <UserSkeleton />
                  <UserSkeleton />
                </>
              ) : activeUsers.length === 0 ? (
                <NotData />
              ) : (
                activeUsers.map((user) =>
                  user.role === 'MANAGER' ?
                    <div key={user.id}></div> :
                    isRevokeLoading && pendingUserId === user.id ? (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium animate-pulse animate-infinite animate-slow animate-ease-in-out animate-delay-1000 animate-repeat-1000">Revoking...</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-blue-600 cursor-pointer animate-pulse animate-infinite animate-slow animate-ease-in-out animate-delay-1000 animate-repeat-1000" onClick={() => handleViewUser(user.photoUrl)}>{user.firstName.toLocaleUpperCase()} {user.lastName.toLocaleUpperCase()}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                        {user.role === 'EMPLOYEE' && (
                          <button
                            onClick={() => handleRevokeAccess(user.id)}
                            title='Revoke access'
                            className="text-red-500 text-sm hover:text-red-600"
                          >
                            Revoke Access
                          </button>
                        )}
                      </div>
                    ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 