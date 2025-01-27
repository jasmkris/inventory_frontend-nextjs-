'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { BiCube } from 'react-icons/bi';
import { HiOutlineClock } from 'react-icons/hi';
import { IoSettingsOutline, IoPerson } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import ProfileSettingsSidebar from '@/components/ProfileSettingsSidebar';
import AccessManagementSidebar from '@/components/AccessManagementSidebar';
import { RefreshCw, UserPlus, LogIn, User } from 'lucide-react';
import axios from 'axios';
import NotData from '@/components/NotData';
import { DashboardLoadingState } from '@/components/LoadingState';
import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';
import { eventEmitter, EVENTS } from '@/lib/eventEmitter';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchModal } from '@/components/SearchModal';

const historyApi = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: historyApi,
  withCredentials: true,
  headers: {
    'Bearer': 'application/json',
  },
});

interface History {
  id: string;
  action: string;
  details: string;
  userId: string;
  userName: string;
  createdAt: string;
  objectId: string;
  objectName: string;
  roomName: string;
}

// Create a separate component for the date display
const FormattedDate = ({ dateString }: { dateString: string }) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const date = new Date(dateString);
    const now = new Date();

    if (isToday(date)) {
      setFormattedDate(formatDistanceToNow(date, { addSuffix: true }));
    } else if (isYesterday(date)) {
      setFormattedDate('yesterday');
    } else {
      const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (daysAgo < 7) {
        setFormattedDate(`${daysAgo} days ago`);
      } else {
        setFormattedDate(format(date, 'MMM d, yyyy'));
      }
    }
  }, [dateString]);

  return <span className="text-sm text-gray-500">{formattedDate}</span>;
};

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccessManagementOpen, setIsAccessManagementOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const [history, setHistory] = useState<History[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const userRole = (session?.user?.role || 'EMPLOYEE') as 'EMPLOYEE' | 'MANAGER';
  const isManager = userRole === 'MANAGER';

  const handleAccessManagementClick = () => {
    console.log('Access Management clicked'); // Debug log
    setIsAccessManagementOpen(true);
    eventEmitter.emit(EVENTS.REFRESH_PENDING_USERS);
    console.log('Event emitted'); // Debug log
  };

  const getHistory = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/history/dashboard');
      if (response.data) {
        setHistory(Array.isArray(response.data.data) ? response.data.data : []);
        setIsLoading(false);
      }
    } catch {
      setHistory([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (id: string, type: 'objects' | 'rooms') => {
    console.log('Selected:', id, type);
    // Handle the selection
    window.open(`/${type}/${id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Search and Settings Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            placeholder={session === undefined || session === null || !session ? "Please login to search" : "Search..."}
            onFocus={() => {
              if (!session) {
                setIsSearchOpen(false);
              } else {
                setIsSearchOpen(true);
              }
            }}
            disabled={session === undefined || session === null || !session}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          {isManager && (
            <button
              onClick={handleAccessManagementClick}
              className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <IoPerson className="w-5 h-5" />
              <span>Access Management</span>
            </button>
          )}
          {
            !(session === undefined || session === null || !session) && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <IoSettingsOutline className="w-6 h-6 text-gray-600" />
              </button>
            )
          }
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Manage your inventory efficiently</p>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link href="/rooms" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <FaHome className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Rooms</h2>
              <p className="text-gray-600 text-center">Manage and organize rooms</p>
            </div>
          </div>
        </Link>

        <Link href="/objects" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-4">
                <BiCube className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Objects</h2>
              <p className="text-gray-600 text-center">View and manage all items</p>
            </div>
          </div>
        </Link>

        <Link href="/history" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-4">
                <HiOutlineClock className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">History</h2>
              <p className="text-gray-600 text-center">Track all changes and movements</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
          <span className="text-gray-600">Recent Activity </span>
          <button onClick={getHistory} className="text-blue-500 hover:text-blue-600"><RefreshCw className="w-4 h-4" /></button>
        </h2>
        <div className="space-y-4">
          {isLoading ? (
            <DashboardLoadingState />
          ) : Array.isArray(history) && history.length > 0 ? (
            history.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BiCube className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{activity.action}</h3>
                  <p className="text-gray-600 text-sm">{activity.details}</p>
                  <p className="text-gray-500 text-xs">{activity.userName}</p>
                </div>
                <FormattedDate dateString={activity.createdAt} />
              </div>
            ))
          ) : (
            <NotData />
          )}
        </div>
      </div>

      {/* Only show Access card for managers */}
      {
        isManager && (
          <Link href="#" onClick={() => setIsAccessManagementOpen(true)} className="block mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                  <IoPerson className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Access</h2>
                <p className="text-gray-600 text-center">Manage team access</p>
              </div>
            </div>
          </Link>
        )
      }

      {
        !session && (
          <div
            className="fixed bottom-8 right-8 flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex gap-2 mr-2"
                >
                  <Link href={`/login?invite=${Date.now()}`}>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Register
                    </motion.button>
                  </Link>
                  <Link href="/login">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
            >
              <User className="h-6 w-6" />
            </motion.button>
          </div>
        )
      }

      <ProfileSettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={{
          name: session?.user?.name || 'John Doe',
          email: session?.user?.email || 'john.doe@example.com',
          image: session?.user?.image || undefined,
        }}
      />

      <AccessManagementSidebar
        isOpen={isAccessManagementOpen}
        onClose={() => setIsAccessManagementOpen(false)}
        currentUserRole={userRole}
      />

      <SearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelect={handleSearch}
      />
    </div >
  );
} 