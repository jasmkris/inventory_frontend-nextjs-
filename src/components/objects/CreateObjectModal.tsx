'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Category = 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';

interface CreateObjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    roomId: string;
    onSubmit: (data: {
        name: string;
        category: Category;
        quantity: number;
        roomId: string;
        description?: string;
    }) => Promise<void>;
}

export function CreateObjectModal({ isOpen, onClose, roomId, onSubmit }: CreateObjectModalProps) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>('OTHER');
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast({
                title: "Error",
                description: "Object name is required",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsLoading(true);
            await onSubmit({
                name,
                category,
                quantity,
                roomId,
                description: description || undefined,
            });
            setName('');
            setCategory('OTHER');
            setQuantity(1);
            setDescription('');
            onClose();
        } catch (error) {
            console.error('Failed to create object:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-6">Add New Object</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Object Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter object name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Category *
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                            required
                        >
                            <option value="CONSUMABLE">Consumable</option>
                            <option value="TEXTILE">Textile</option>
                            <option value="EQUIPMENT">Equipment</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity *
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter object description"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating...' : 'Create Object'}
                    </button>
                </form>
            </div>
        </div>
    );
} 