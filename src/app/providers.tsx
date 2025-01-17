'use client';

import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
<<<<<<< HEAD
import Navigation from "@/components/Navigation";
=======
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
<<<<<<< HEAD
        <Navigation />
=======
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
        {children}
        <Toaster />
      </AuthProvider>
    </SessionProvider>
  );
} 