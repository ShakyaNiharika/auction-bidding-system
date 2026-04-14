/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, type UseQueryResult, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

export const useGetUsers = (): UseQueryResult<any[], unknown> => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const response = await api.get("users");
                return response?.data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch users";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        retry: false,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.delete(`users/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete user");
        }
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await api.patch(`users/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update user");
        }
    });
};
