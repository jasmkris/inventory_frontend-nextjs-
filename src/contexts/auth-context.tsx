'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import type { LoginFormData, RegisterFormData } from '@/lib/validations/auth';
import { authService } from '@/services/api';

interface AuthContextType {
  user: Session['user'] | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Session['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await fetch('/api/auth/session');
      const data = await session.json();
      setUser(data?.user ?? null);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      await checkAuth();
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // await signOut({ 
      //   redirect: false,
      //   callbackUrl: '/login'
      // });
      await signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`  // Explicitly set the full URL
      });
      setUser(null);
      router.push(`${window.location.origin}/login`);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (userData: RegisterFormData) => {
    try {
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });

      // if (!response.ok) {
      //   throw new Error('Registration failed');
      // }

      await login(userData.email, userData.password);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 