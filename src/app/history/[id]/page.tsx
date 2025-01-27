'use client';

import React, { useState, useEffect } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { BiTransfer, BiTrash, BiEdit, BiPlus } from 'react-icons/bi';
import { Clock, Filter } from 'lucide-react';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { Sheet, SheetHeader, SheetDescription, SheetTitle, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { LoadingState } from '@/components/LoadingState';
import { useParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Bearer': 'application/json',
  },
});

interface HistoryItem {
  id: string;
  objectName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE' | 'TRANSIT' | 'REMOVE';
  details: string;
  quantity: number;
  createdAt: Date;
  roomName: string;
  userName: string;
}

type SortField = 'createdAt' | 'action' | 'objectName' | 'userName' | 'category';
type DateFilter = 'all' | 'today' | 'week' | 'month';

export default function ObjectHistoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<'objectName' | 'userName'>('objectName');
  const [isLoading, setIsLoading] = useState(true);
  const [objectName, setObjectName] = useState('UNKNOWN');
  const { id } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await api.get(`/objects/${id}/history`);
      setHistoryItems(response.data);
      setIsLoading(false);
    };
    const fetchObject = async () => {
      const response = await api.post(`/objects/${id}/details`);
      setObjectName(response.data.name);
      fetchHistory();
      setIsLoading(false);
    };
    fetchObject();
  }, [id]);


  const getActionIcon = (action: HistoryItem['action']) => {
    switch (action) {
      case 'MOVE':
        return <BiTransfer className="w-5 h-5 text-blue-500" />;
      case 'REMOVE':
        return <BiTrash className="w-5 h-5 text-red-500" />;
      case 'UPDATE':
        return <BiEdit className="w-5 h-5 text-green-500" />;
      case 'CREATE':
        return <BiPlus className="w-5 h-5 text-green-500" />;
      case 'DELETE':
        return <BiTrash className="w-5 h-5 text-red-500" />;
      case 'TRANSIT':
        return <BiTransfer className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredAndSortedHistory = [...historyItems]
    .filter(item => {
      // Apply all filters
      const matchesSearch = searchTerm === '' || (
        searchField === 'objectName'
          ? item.objectName.toLowerCase().includes(searchTerm.toLowerCase())
          : item.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesDate = (() => {
        if (dateFilter === 'all') return true;

        const date = new Date(item.createdAt);
        const now = new Date();

        switch (dateFilter) {
          case 'today':
            return date.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            return date >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
            return date >= monthAgo;
          default:
            return true;
        }
      })();

      // Return true only if all filters match
      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;

      switch (sortBy) {
        case 'createdAt':
          return multiplier * (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'action':
          return multiplier * a.action.localeCompare(b.action);
        case 'objectName':
          return multiplier * a.objectName.localeCompare(b.objectName);
        case 'userName':
          return multiplier * a.userName.localeCompare(b.userName);
        case 'category':
          return multiplier * (a.roomName?.localeCompare(b.roomName) ?? 0);
        default:
          return 0;
      }
    });

  if (isLoading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Back to Dashboard Link */}
      <div
        onClick={() => { window.history.back() }}
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 cursor-pointer"
      >
        <IoChevronBack className="w-5 h-5 mr-1" />
        Back to Dashboard
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{objectName}</h1>
        <p className="text-gray-600">Track all changes and movements</p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2 mb-4">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <div className="relative flex-1">
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={searchField}
                onValueChange={(value: 'objectName' | 'userName') => setSearchField(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="objectName">Object Name</SelectItem>
                  <SelectItem value="userName">User Name</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="text"
                placeholder={`Search by ${searchField === 'objectName' ? 'object name' : 'user name'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Objects</SheetTitle>
              <SheetDescription>
                Adjust filters to find specific objects
              </SheetDescription>
            </SheetHeader>

            <div className="py-4 space-y-6">
              {/* Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select
                  value={dateFilter}
                  onValueChange={(value: DateFilter) => setDateFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select
                  value={sortBy}
                  onValueChange={(value: SortField) => setSortBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="objectName">Object Name</SelectItem>
                    <SelectItem value="userName">User Name</SelectItem>
                    <SelectItem value="category">Room Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Order</label>
                <Select
                  value={sortOrder}
                  onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setDateFilter('all');
                  setSortBy('createdAt');
                  setSortOrder('desc');
                  setSearchTerm('');
                  setSearchField('objectName');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredAndSortedHistory.map((item) => (
          <div
            key={`${item.id}-${item.createdAt}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getActionIcon(item.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-x-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.objectName}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {item.details}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {(() => {
                        switch (item.action) {
                          case 'MOVE':
                            return '🔄';
                          case 'REMOVE':
                            return '🗑️';
                          case 'UPDATE':
                            return '✏️';
                          case 'CREATE':
                            return '✨';
                          case 'DELETE':
                            return '❌';
                          case 'TRANSIT':
                            return '🚚';
                          default:
                            return '📝';
                        }
                      })()}
                      <div className="text-sm text-gray-500">{item.roomName}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span>{item.userName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 