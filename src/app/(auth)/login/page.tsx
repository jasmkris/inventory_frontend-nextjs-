'use client';

import React, { useState } from 'react';
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

const API_BASE_URL = process.env.NEXTAUTH_URL || 'https://213.108.20.181/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, register } = useAuth();

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
      // Add your login API call here
      console.log(data, 'login data');
      const response = await api.post('/auth/login', data);
      if (!response) {
        throw new Error('Login failed');
      }
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      await login(data.email, data.password);
    } catch {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      // toast({
      //   title: "warning",
      //   description: "Not match password",
      //   variant: "warning",
      // });
      // } else {
      //   toast({
      //     title: "Error",
      //     description: "Failed to login",
      //     variant: "destructive",
      //   });
      // }
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <Tabs defaultValue="login" className="w-full">
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
