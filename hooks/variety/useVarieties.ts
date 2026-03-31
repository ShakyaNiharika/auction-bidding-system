import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Variety } from '../../types/variety';
import toast from 'react-hot-toast';

export const useGetVarieties = () => {
    return useQuery<Variety[]>({
        queryKey: ['varieties'],
        queryFn: async () => {
            const response = await api.get('varieties');
            return response.data;
        },
    });
};

export const useCreateVariety = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Variety>) => {
            const response = await api.post('varieties', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['varieties'] });
            toast.success('Variety added successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to add variety';
            toast.error(message);
        }
    });
};

export const useUpdateVariety = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: Partial<Variety> }) => {
            const response = await api.patch(`varieties/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['varieties'] });
            toast.success('Variety updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update variety';
            toast.error(message);
        }
    });
};

export const useDeleteVariety = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`varieties/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['varieties'] });
            toast.success('Variety deleted successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete variety';
            toast.error(message);
        }
    });
};
