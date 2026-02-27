/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

export const usePlaceBid = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
            const response = await api.post(`auctions/${id}/bids`, { amount });
            return response.data;
        },
        onSuccess: (_, variables) => {
            toast.success("Bid placed successfully!");
            // Invalidate the specific auction query to refetch updated price
            queryClient.invalidateQueries({ queryKey: ["auction", variables.id] });
            // Also invalidate general auctions list
            queryClient.invalidateQueries({ queryKey: ["auctions"] });
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to place bid";
            toast.error(errorMessage);
        },
    });
};
