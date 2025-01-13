'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoChevronBack, IoPencil, IoTrash } from 'react-icons/io5';
import { BiCube } from 'react-icons/bi';

interface ObjectDetails {
  id: string;
  name: string;
  category: string;
  room: string;
  quantity: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ObjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [object, setObject] = useState<ObjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Replace with actual API call
    const fetchObject = async () => {
      try {
        // const response = await fetch(`/api/objects/${params.id}`);
        // const data = await response.json();
        // setObject(data);
        
        // Mock data
        setObject({
          id: params.id as string,
          name: 'Power Tools Set',
          category: 'Tools',
          room: 'Main Garage',
          quantity: 1,
          description: 'Complete set of power tools including drill, saw, and sander',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error fetching object:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchObject();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this object?')) return;
    
    setIsDeleting(true);
    try {
      // await fetch(`/api/objects/${params.id}`, { method: 'DELETE' });
      router.push('/objects');
    } catch (error) {
      console.error('Error deleting object:', error);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!object) {
    return <div className="p-4">Object not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Link 
        href="/objects" 
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
      >
        <IoChevronBack className="w-5 h-5 mr-1" />
        Back to Objects
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BiCube className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{object.name}</h1>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <span>{object.category}</span>
                <span className="mx-2">•</span>
                <span>{object.room}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => router.push(`/objects/${object.id}/edit`)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoPencil className="w-5 h-5" />
            </button>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <IoTrash className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-medium text-gray-900 mb-2">Details</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Quantity</dt>
                <dd className="text-gray-900">{object.quantity}</dd>
              </div>
              {object.description && (
                <div>
                  <dt className="text-sm text-gray-500">Description</dt>
                  <dd className="text-gray-900">{object.description}</dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h2 className="font-medium text-gray-900 mb-2">History</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Created</dt>
                <dd className="text-gray-900">
                  {new Date(object.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Last Updated</dt>
                <dd className="text-gray-900">
                  {new Date(object.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 