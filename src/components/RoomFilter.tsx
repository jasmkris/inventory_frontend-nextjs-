'use client';

// import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

export function RoomFilter({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  onCategoryChange,
}: FilterProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Items</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <h3 className="mb-4 text-sm font-medium">Categories</h3>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 