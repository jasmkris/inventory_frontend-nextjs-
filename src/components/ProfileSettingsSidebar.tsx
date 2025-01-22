'use client';

// import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FiUser, FiKey, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const imageURI = process.env.NEXT_PUBLIC_IMAGE_URL;

interface ProfileSettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function ProfileSettingsSidebar({ isOpen, onClose, user }: ProfileSettingsSidebarProps) {
  const router = useRouter();
  const handleLogout = async () => {
    // await signOut({ callbackUrl: `${window.location.origin}/login` });
    await signOut({
      redirect: false,
      callbackUrl: '/login'  // Explicitly set the full URL
    });
    router.push(`${window.location.origin}/login`);
    // router.push('/login');
    // router.refresh();
  };

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
          }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              {user.image  ? (
                <Image
                  src={imageURI + user.image}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <span className="text-2xl text-blue-500">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 text-gray-500" />
                <span>Edit Profile</span>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <FiKey className="w-5 h-5 text-gray-500" />
                <span>Change Password</span>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 