// 'use client';

// import React, { useState } from 'react';
// import { Eye, EyeOff, Camera, Loader2 } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useToast } from "@/hooks/use-toast";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { loginSchema, registerSchema } from '@/lib/validations/auth';
// import type { LoginFormData, RegisterFormData } from '@/lib/validations/auth';
// import { LoginForm } from '@/components/auth/LoginForm';
// import { RegistrationForm } from '@/components/auth/RegistrationForm';

// const LoginPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const loginForm = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//       rememberMe: false,
//     },
//   });

//   const registerForm = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       fullName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   const onLoginSubmit = async (data: LoginFormData) => {
//     try {
//       setIsLoading(true);
//       // Add your login API call here

//       toast({
//         title: "Success",
//         description: "Logged in successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to login",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onRegisterSubmit = async (data: RegisterFormData) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Registration failed');
//       }

//       toast({
//         title: "Success",
//         description: "Account created successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create account",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
//       <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
//         <Tabs defaultValue="login" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-4">
//             <TabsTrigger value="login" disabled={isLoading}>Login</TabsTrigger>
//             <TabsTrigger value="register" disabled={isLoading}>Register</TabsTrigger>
//           </TabsList>

//           <TabsContent value="login">
//             <LoginForm 
//               form={loginForm} 
//               onSubmit={onLoginSubmit} 
//               isLoading={isLoading} 
//             />
//           </TabsContent>

//           <TabsContent value="register">
//             <RegistrationForm 
//               form={registerForm} 
//               onSubmit={onRegisterSubmit} 
//               isLoading={isLoading} 
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // ... LoginForm and RegistrationForm components with updated props and validation

// export default LoginPage; 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegistrationForm } from '@/components/auth/RegistrationForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import type { LoginFormData, RegisterFormData } from '@/lib/validations/auth';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    // resolver: zodResolver(loginSchema),
    // defaultValues: {
    //   email: '',
    //   password: '',
    //   rememberMe: false,
    // },
  });

  const registerForm = useForm<RegisterFormData>({
    // resolver: zodResolver(registerSchema),
    // defaultValues: {
    //   fullName: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    // },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    // try {
    //   setIsLoading(true);
    //   const result = await signIn('credentials', {
    //     redirect: false,
    //     email: data.email,
    //     password: data.password,
    //   });

    //   if (result?.error) {
    //     throw new Error(result.error);
    //   }

    //   router.push('/dashboard');
    //   router.refresh();
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch('/api/auth/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Registration failed');
    //   }

    //   await signIn('credentials', {
    //     redirect: false,
    //     email: data.email,
    //     password: data.password,
    //   });

    //   router.push('/dashboard');
    //   router.refresh();
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login" disabled={isLoading}>
              Login
            </TabsTrigger>
            <TabsTrigger value="register" disabled={isLoading}>
              Register
            </TabsTrigger>
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
}