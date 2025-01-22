'use client';

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import type { LoginFormData } from '@/lib/validations/auth';
// import { useAuth } from '@/contexts/auth-context';
// import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

export function LoginForm({ form, onSubmit, isLoading }: LoginFormProps) {
  // const { login } = useAuth();
  // const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors } } = form;
    
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
        <p className="text-gray-600">Log in to manage your inventory</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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
            {errors.password && (
              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">⚠</span>
            )}
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            {...register('rememberMe')}
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-gray-300"
            disabled={isLoading}
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
} 