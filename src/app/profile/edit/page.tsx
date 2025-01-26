'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { userService } from '@/services/api';
import { LoadingState } from '@/components/LoadingState';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const ImageURI = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function EditProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { toast } = useToast();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const { data: session, update } = useSession();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (session?.user) {
            reset({
                firstName: session.user.name?.split(' ')[0] || '',
                lastName: session.user.name?.split(' ')[1] || '',
                email: session.user.email || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            if (session.user.image) {
                setPreviewUrl(ImageURI + session.user.image);
            }
            setIsPageLoading(false);
        }
    }, [session, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            // Handle image upload if there's a new image
            let uploadedImagePath = null;
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile); // Change 'image' to 'file' to match backend
                const imageResponse: any = await userService.uploadProfileImage(formData);
                uploadedImagePath = imageResponse.imageUrl;
            }

            // Update profile data
            const updateData = {
                id: session?.user?.id,
                email: session?.user?.email,
                firstName: data.firstName,
                lastName: data.lastName,
                currentPassword: data.currentPassword,
                ...(data.newPassword && { newPassword: data.newPassword }),
                ...(uploadedImagePath && { image: uploadedImagePath })
            };

            const response: any = await userService.updateProfile(updateData);
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                });
                
                try {
                    await update({
                        ...session,
                        user: {
                            ...session?.user,
                            name: `${data.firstName} ${data.lastName}`,
                            image: response.data.photoUrl,
                        }
                    });

                } catch (updateError) {
                    console.error('Session update error:', updateError);
                }
            } else {
                toast({
                    title: "Error",
                    description: response?.error || "Failed to update profile",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isPageLoading) {
        return <LoadingState />;
    }

    return (
        <div className="container max-w-2xl py-8 min-h-screen min-w-full flex justify-center items-center">
            <Card className="mx-10 max-w-2xl w-2xl">
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                {/* {
                                    session?.user?.image && previewUrl || ImageURI || session ?
                                        <Image
                                            src={previewUrl || '/placeholder-avatar.png'}
                                            alt="Profile"
                                            width={128}
                                            height={128}
                                            className="object-cover h-full w-full"
                                        />
                                        :
                                        <div className="w-full h-full flex items-center justify-center bg-blue-100">
                                            <span className="text-2xl text-blue-500">
                                                {'?'}
                                            </span>
                                        </div>
                                } */}
                                <Image
                                    src={previewUrl || '/placeholder-avatar.png'}
                                    alt="Profile"
                                    width={128}
                                    height={128}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                            <div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="profile-image"
                                />
                                <Label
                                    htmlFor="profile-image"
                                    className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
                                >
                                    Change Profile Picture
                                </Label>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    {...register('firstName')}
                                    error={errors.firstName?.message}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    {...register('lastName')}
                                    error={errors.lastName?.message}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                disabled
                                {...register('email')}
                                error={errors.email?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                {...register('currentPassword')}
                                error={errors.currentPassword?.message}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    {...register('newPassword')}
                                    error={errors.newPassword?.message}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword')}
                                    error={errors.confirmPassword?.message}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 