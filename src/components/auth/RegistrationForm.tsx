'use client';

import React, { useState, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff, Camera, Loader2 } from 'lucide-react';
import type { RegisterFormData } from '@/lib/validations/auth';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface RegistrationFormProps {
  form: UseFormReturn<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

export function RegistrationForm({ form, onSubmit, isLoading }: RegistrationFormProps) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewSelfie, setPreviewSelfie] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, formState: { errors } } = form;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      form.setValue('selfie', file);
      setPreviewSelfie(imageUrl);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch {
      toast({
        title: "Error",
        description: "Unable to access camera",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const takeSelfie = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setPreviewSelfie(imageData);
        stopCamera();
      }
    }
  };
// const handleCaptureSelfie = async () => {
//   try {
//     if (videoRef.current && streamRef.current) {
//       const canvas = document.createElement('canvas');
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext('2d');
      
//       if (ctx && videoRef.current) {
//         ctx.drawImage(videoRef.current, 0, 0);
        
//         // Convert canvas to blob
//         canvas.toBlob((blob) => {
//           if (blob) {
//             // Create a File object from the blob
//             const selfieFile = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
            
//             // Update form data
//             form.setValue('selfie', selfieFile);
            
//             // Set preview
//             setPreviewSelfie(URL.createObjectURL(blob));
//           }
//         }, 'image/jpeg');
//       }
      
//       // Stop camera stream
//       streamRef.current.getTracks().forEach(track => track.stop());
//       setIsCameraOpen(false);
//     }
//   } catch (error) {
//     console.error('Error capturing selfie:', error);
//     toast({
//       title: "Error",
//       description: "Failed to capture selfie",
//       variant: "destructive",
//     });
//   }
// };
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-1">Create Account</h1>
        <p className="text-gray-600">Sign up to get started</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <div className="relative">
            <input
              {...register('fullName')}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            {errors.fullName && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">⚠</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            {errors.email && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">⚠</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Selfie Photo ID</label>
          <div className="flex flex-col items-center space-y-3">
            {isCameraOpen ? (
              <div className="relative w-full max-w-sm">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <button
                  type="button"
                  onClick={takeSelfie}
                  className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Take Photo
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                {previewSelfie ? (
                  <div className="relative w-32 h-32">
                    <Image
                      src={previewSelfie}
                      width={100}
                      height={100}
                      alt="Selfie preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewSelfie(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full flex items-center justify-center w-6 h-6"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center">
                    <Camera size={40} className="text-gray-400" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input
                    // {...register('selfie', { value: previewSelfie })}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Take Selfie
                  </button>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 mt-6"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm; 