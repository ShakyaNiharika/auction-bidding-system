import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

export interface UserProfile {
    _id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address?: string;
    date_of_birth?: string;
    role: string;
    profile_picture?: string;
    createdAt: string;
    updatedAt: string;
}

export const useGetProfile = () => {
    return useQuery<UserProfile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await api.get('users/profile');
            return response.data;
        }
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<UserProfile>) => {
            const response = await api.patch('users/profile', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update profile';
            toast.error(message);
        }
    });
};
