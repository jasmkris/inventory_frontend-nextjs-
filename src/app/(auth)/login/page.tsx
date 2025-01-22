'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import type { LoginFormData, RegisterFormData } from '@/lib/validations/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegistrationForm } from '@/components/auth/RegistrationForm';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';
import { useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, register } = useAuth();

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      selfie: null,
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', data);
      if (response.data) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        await login(data.email, data.password);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      // Create FormData object
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('fullName', data.fullName);
      formData.append('confirmPassword', data.confirmPassword);

      // Append selfie if it exists
      if (data.selfie instanceof File) {
        formData.append('selfie', data.selfie);
      }

      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data) {
        throw new Error('Registration failed');
      }
      await register(data);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } catch {
      // if (error.response.status === 400) {
      //   toast({
      //     title: "warning",
      //     description: "Email already exists",
      //     variant: "warning",
      //   });
      // } else {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
      // }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check for invite parameter and switch to register tab
    const inviteParam = searchParams.get('invite');
    if (inviteParam) {
      setActiveTab("register");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login" disabled={isLoading}>Login</TabsTrigger>
            <TabsTrigger value="register" disabled={isLoading}>Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm
              form={loginForm}
              onSubmit={onLoginSubmit}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="register">
            <RegistrationForm
              form={registerForm}
              onSubmit={onRegisterSubmit}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// ... LoginForm and RegistrationForm components with updated props and validation

export default LoginPage;
