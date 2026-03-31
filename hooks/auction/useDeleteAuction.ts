/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

export const useDeleteAuction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.delete(`auctions/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auctions"] });
            queryClient.invalidateQueries({ queryKey: ["my-auctions"] });
            toast.success("Auction deleted successfully!");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to delete auction";
            toast.error(errorMessage);
        },
    });
};
