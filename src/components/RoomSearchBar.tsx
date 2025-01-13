'use client';

import { IoSearchOutline } from 'react-icons/io5';

interface RoomSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RoomSearchBar({ value, onChange }: RoomSearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <IoSearchOutline className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search rooms..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
} 