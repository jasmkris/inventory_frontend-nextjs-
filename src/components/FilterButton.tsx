'use client';

import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterButtonProps {
  options: FilterOption[];
  onFilter: (value: string) => void;
}

export default function FilterButton({ options, onFilter }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IoFilter className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilter(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 