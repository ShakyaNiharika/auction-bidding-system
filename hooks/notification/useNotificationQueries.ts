/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

export const useGetNotifications = (): UseQueryResult<any[], unknown> => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const response = await api.get("notifications");
                return response?.data;
            } catch (error: any) {
                console.error("Failed to fetch notifications", error);
                return [];
            }
        },
        retry: false,
    });
};

export const useGetUnreadCount = (): UseQueryResult<{ count: number }, unknown> => {
    return useQuery({
        queryKey: ["notifications", "unread-count"],
        queryFn: async () => {
            try {
                const response = await api.get("notifications/unread-count");
                return response?.data;
            } catch (error: any) {
                console.error("Failed to fetch unread count", error);
                return { count: 0 };
            }
        },
        refetchInterval: 30000, // Refetch every 30 seconds as fallback
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.patch(`notifications/${id}/read`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to mark notification as read");
        },
    });
};
